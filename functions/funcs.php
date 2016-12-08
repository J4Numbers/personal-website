<?php

//require_once $home_dir . "/functions/enums.php";

function timer($t = 0) {
    if ($t == 0)
        return microtime(true);
    else
        return microtime(true) - $t;
}

function run_mal_python($home, $anime = true, $title, $id)
{
    if ($anime)
    {
        $file = 'mal_anime.py';
    }
    else
    {
        $file = 'mal_manga.py';
    }

    $descPipes = array(
        0 => array('pipe', 'r'),
        1 => array('pipe', 'w'),
        2 => array('file', 'err.log', 'a')
    );

    $cwd = getcwd();
    $env = array();

    $proc = proc_open('python ' . $home . '/scripts/py/' . $file,
        $descPipes, $pipes, $cwd, $env);

    $got = '';

    if (is_resource($proc))
    {
        fwrite($pipes[0], str_replace(' ', '+', $title) . ' ' . $id);
        fclose($pipes[0]);

        $got = stream_get_contents($pipes[1]);
        fclose($pipes[1]);

        proc_close($proc);
    }

    return $got;
}

/**
 * @param \m4numbers\Database\DataBase $database
 * @param SimpleXMLElement $anime_page
 * @param string $home_dir
 */
function process_anime($database, $anime_page, $home_dir)
{

    if ($database->check_anime_exists_already(
        $anime_page->series_animedb_id))
    {
        $database->refresh_general_anime_details(
            $anime_page->series_animedb_id,
            $anime_page->series_episodes,
            $anime_page->series_image,
            process_anime_series_state($anime_page->series_status)
        );

        if (!$database->check_freshness_of_anime(
            (int) $anime_page->series_animedb_id,
            (int) $anime_page->my_watched_episodes,
            (int) $anime_page->my_status
        ))
        {
            $database->update_anime(
                (int) $anime_page->series_animedb_id,
                (int) $anime_page->my_watched_episodes,
                (int) $anime_page->my_status,
                (int) $anime_page->my_score
            );
        }
    }
    else
    {
        $got = run_mal_python(
            $home_dir, true, $anime_page->series_title,
            $anime_page->series_animedb_id
        );

        if ($got !== '')
        {
            $mal_collection = simplexml_load_string($got);

            foreach ($mal_collection->entry as $mal_entry)
            {
                if ((int) $mal_entry->id
                    == (int) $anime_page->series_animedb_id
                )
                {
                    $database->add_new_anime(
                        (int) $anime_page->series_animedb_id,
                        (string) $anime_page->series_title,
                        (string) $mal_entry->synopsis,
                        (int) $anime_page->my_watched_episodes,
                        (int) $anime_page->series_episodes,
                        (int) $anime_page->my_score,
                        (int) $anime_page->my_status,
                        (int) $anime_page->series_status,
                        (string) $anime_page->series_image
                    );
                }
            }
        }
    }

}

/**
 * @param \m4numbers\Database\DataBase $database
 * @param SimpleXMLElement $manga_page
 * @param string $home_dir
 */
function process_manga($database, $manga_page, $home_dir)
{
    if ($database->check_manga_exists_already(
        $manga_page->series_mangadb_id))
    {
        $database->refresh_general_manga_details(
            $manga_page->series_mangadb_id,
            $manga_page->series_volumes,
            $manga_page->series_chapters,
            $manga_page->series_image,
            process_manga_series_state($manga_page->series_status)
        );

        if (!$database->check_freshness_of_manga(
            (int) $manga_page->series_mangadb_id,
            (int) $manga_page->my_read_chapters,
            (int) $manga_page->my_status
        ))
        {
            $database->update_manga(
                (int) $manga_page->series_mangadb_id,
                (int) $manga_page->my_read_volumes,
                (int) $manga_page->my_read_chapters,
                (int) $manga_page->my_status,
                (int) $manga_page->my_score
            );
        }
    }
    else
    {
        $got = run_mal_python(
            $home_dir, false, $manga_page->series_title,
            $manga_page->series_mangadb_id
        );

        if ($got !== '')
        {
            $mal_collection = simplexml_load_string($got);

            foreach ($mal_collection->entry as $mal_entry)
            {
                if ((int)$mal_entry->id == (int)$manga_page->series_mangadb_id)
                {

                    $database->add_new_manga(
                        (int) $manga_page->series_mangadb_id,
                        (string) $manga_page->series_title,
                        (string) $mal_entry->synopsis,
                        (int) $manga_page->series_volumes,
                        (int) $manga_page->series_chapters,
                        (int) $manga_page->my_read_volumes,
                        (int) $manga_page->my_read_chapters,
                        (int) $manga_page->my_score,
                        (int) $manga_page->my_status,
                        (int) $manga_page->series_status,
                        (string) $manga_page->series_image,
                        (int) $manga_page->series_type
                    );

                }
            }
        }

    }
}

function process_anime_state($state)
{
    switch ($state)
    {
        case 1:
            return ANIME_WATCHING;
        case 2:
            return ANIME_COMPLETED;
        case 3:
            return ANIME_HOLDING;
        case 4:
            return ANIME_DROPPED;
        case 5:
            break;
        case 6:
            return ANIME_PLANNED;
    }
    return -1;
}

function process_anime_series_state($state)
{
    switch ($state)
    {
        case 1:
            return ANIME_CURRENTLY_AIRING;
        case 2:
            return ANIME_FINISHED;
        case 3:
            return ANIME_NOT_YET_AIRED;
    }
    return -1;
}

function process_manga_state($state)
{
    switch ($state)
    {
        case 1:
            return MANGA_READING;
        case 2:
            return MANGA_COMPLETED;
        case 3:
            return MANGA_HOLDING;
        case 4:
            return MANGA_DROPPED;
        case 5:
            break;
        case 6:
            return MANGA_PLANNED;
    }
    return -1;
}

function process_manga_series_state($state)
{
    switch ($state)
    {
        case 1:
            return MANGA_CURRENTLY_PUBLISHING;
        case 2:
            return MANGA_PUBLISHED;
        case 3:
            return MANGA_NOT_YET_PUBLISHED;
    }
    return -1;
}

function process_manga_type($type)
{
    if ($type == 1)
    {
        return MANGA_TYPE_MANGA;
    }
    return MANGA_TYPE_LIGHT_NOVEL;
}

function toggle_anime_state($state)
{
    if (is_numeric($state))
    {
        switch ($state) {
            case ANIME_COMPLETED:
                return 'Completed';
            case ANIME_DROPPED:
                return 'Dropped';
            case ANIME_HOLDING:
                return 'On-Hold';
            case ANIME_PLANNED:
                return 'Plan to Watch';
            case ANIME_WATCHING:
                return 'Watching';

            case ANIME_NOT_YET_AIRED:
                return "Not yet aired";
            case ANIME_FINISHED:
                return "Finished airing";
            case ANIME_CURRENTLY_AIRING:
                return "Currently airing";
        }
    }
    switch ($state)
    {
        case 'Completed':
            return ANIME_COMPLETED;
        case 'Dropped':
            return ANIME_DROPPED;
        case 'Watching':
            return ANIME_WATCHING;
        case 'Plan to Watch':
            return ANIME_PLANNED;
        case 'On-Hold':
            return ANIME_HOLDING;

        case "Not yet aired":
            return ANIME_NOT_YET_AIRED;
        case "Finished airing":
            return ANIME_FINISHED;
        case "Currently airing":
            return ANIME_CURRENTLY_AIRING;
    }

    return -1;
}

function toggle_manga_state($state)
{
    if (is_numeric($state))
    {
        switch ($state) {
            case MANGA_COMPLETED:
                return 'Completed';
            case MANGA_DROPPED:
                return 'Dropped';
            case MANGA_HOLDING:
                return 'On-Hold';
            case MANGA_PLANNED:
                return 'Plan to Read';
            case MANGA_READING:
                return 'Reading';
        }
    }
    switch ($state)
    {
        case 'Completed':
            return MANGA_COMPLETED;
        case 'Dropped':
            return MANGA_DROPPED;
        case 'Reading':
            return MANGA_READING;
        case 'Plan to Read':
            return MANGA_PLANNED;
        case 'On-Hold':
            return MANGA_HOLDING;
    }

    return -1;
}
