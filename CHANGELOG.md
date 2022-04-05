# Changelog

#### 2.0.1 (2022-04-05)

##### Build System / Dependencies

* **tf:**  add terraform ecs ([4899df14](https://github.com/j4numbers/personal-website/commit/4899df149454fc198a0633a96cdaf0eb533e8970))

#### 2.0.0 (2022-04-04)

##### Build System / Dependencies

* **npm:**
  *  move from beta to snapshots ([5cdc0153](https://github.com/j4numbers/personal-website/commit/5cdc0153e2ea8ee209dd12270a75265e279b383e))
  *  update all npm outdated packages ([a4c65119](https://github.com/j4numbers/personal-website/commit/a4c65119aef6d5739ffd1eeb5ec03c804208cf81))
  *  version bump of all packages ([03ceaf84](https://github.com/j4numbers/personal-website/commit/03ceaf848cc177d6001367d697b035d354d0fc13))
  *  updated mongoose ([c63a4920](https://github.com/j4numbers/personal-website/commit/c63a4920059d917761f472c4109b9a547e8ec3b8))
  *  version bump to 2.0.0-beta2 ([7f96bfb4](https://github.com/j4numbers/personal-website/commit/7f96bfb4154ea804087f4e1bb06d715e28cc78dd))
  *  package update to the new way of doing things ([ff98b7f2](https://github.com/j4numbers/personal-website/commit/ff98b7f2dc117b844571646dab7cdd08b3e0d1f5))
  *  moved away from yarn and updated packages ([274ac2ef](https://github.com/j4numbers/personal-website/commit/274ac2ef2f594b7611dc3bc325320ed07c3e7f9f))
  *  updated the project to version 1 and added npm pack items ([76461cd9](https://github.com/j4numbers/personal-website/commit/76461cd9a7639cac55a258222188bb511cc3807d))
* **deps:**
  *  bump y18n from 3.2.1 to 3.2.2 ([8784cb9c](https://github.com/j4numbers/personal-website/commit/8784cb9c760e9f6e57c6606802f6db5f5eb98e42))
  *  bump yargs-parser from 5.0.0 to 5.0.1 ([44e62113](https://github.com/j4numbers/personal-website/commit/44e621137d37c8cbc4f2c369a4a176827862aede))
  *  bump ini from 1.3.5 to 1.3.8 ([3e1ed66c](https://github.com/j4numbers/personal-website/commit/3e1ed66c995821bb40073a07c89e2636aa32622a))
  *  bump mongoose from 5.7.4 to 5.7.5 ([d0564322](https://github.com/j4numbers/personal-website/commit/d05643225c7ebe1e300f3d931efa8325d750c7b8))
  *  bump jquery from 3.4.1 to 3.5.0 ([9cd23ca4](https://github.com/j4numbers/personal-website/commit/9cd23ca497fefaccffbc2e5dbe9a4e33992e0de0))
  *  bump https-proxy-agent from 2.2.2 to 2.2.4 ([8a899fb4](https://github.com/j4numbers/personal-website/commit/8a899fb48785822c8acf4457b639011d1c71bed2))
  *  bump acorn from 7.1.0 to 7.1.1 ([45b18177](https://github.com/j4numbers/personal-website/commit/45b18177ce3f1af2187377aa85e41d6e5c0c413c))
* **certs:**  bump cert generation up to a year ([45a966c7](https://github.com/j4numbers/personal-website/commit/45a966c7252753ab639a699c418f38de1081e1b2))
* **terraform:**  start dragging in terraform code around the project ([3c60f6a2](https://github.com/j4numbers/personal-website/commit/3c60f6a2e0b33f687e95f2d53244ddb890014a8d))
* **docker:**
  *  corrected any issues with the dockerfile implementation ([95cca16a](https://github.com/j4numbers/personal-website/commit/95cca16ae3d41fd0c394a24365e778f2319d4e1a))
  *  remove all deployment configurations from docker build ([12509db9](https://github.com/j4numbers/personal-website/commit/12509db9e8995a0d5562555ef44371d152610ecc))
  *  brought in a more complete docker build process ([49d0be8f](https://github.com/j4numbers/personal-website/commit/49d0be8f6cb04ba55b47b9f53d95cac1e34db7a4))
* **yarn:**  updated the yarn lock and bootstrap ([118f7309](https://github.com/j4numbers/personal-website/commit/118f73099d340f17d494e8c0a197aa39dfacc01c))
* **package:**  brought in multer for file uploading ([f0e0b46b](https://github.com/j4numbers/personal-website/commit/f0e0b46b8829a67c061f683b1e70621f606dcf65))

##### Chores

* **luxon:**  remove moment and use luxon ([badd777b](https://github.com/j4numbers/personal-website/commit/badd777b6762612a10314055df81472216f914b6))
* **deps:**  update all outdated dependencies ([7ffa4882](https://github.com/j4numbers/personal-website/commit/7ffa4882c9b10514c52711955e6d05d755a09bb0))
* **npm:**
  *  package update ([08dd3f61](https://github.com/j4numbers/personal-website/commit/08dd3f6160b2cd5998ce4a206da9f35976f40f64))
  *  update npm packages ([d061b534](https://github.com/j4numbers/personal-website/commit/d061b534cab5efaca3773d887a1f80a3a7f079b6))
  *  security fixes for packages ([4acb5707](https://github.com/j4numbers/personal-website/commit/4acb570751b48f80edd653eb84ba907daf0a42c5))
* **data:**  moved static documents to auto insert on docker load ([21929ba1](https://github.com/j4numbers/personal-website/commit/21929ba14cc11a4c8ba7cad696fbee865d8fdbe1))
* **ignore:**
  *  ignore all future cert files ([1892ec32](https://github.com/j4numbers/personal-website/commit/1892ec32a1ecaf4597565840460d1e854d2b38ec))
  *  start ignoring the intellij files ([bc92d47a](https://github.com/j4numbers/personal-website/commit/bc92d47ac9e3a842cfefb684908a4d34f67414c0))
* **certs:**  remove certs from repo ([aaccd84b](https://github.com/j4numbers/personal-website/commit/aaccd84b6a973d3423fc4dfe7447b6aa1509b271))
* **intellij:**  strip out jetbrains files ([41e3dae9](https://github.com/j4numbers/personal-website/commit/41e3dae9c891dfd30450f941c6595b01c1adec42))
* **routes:**
  *  removed pointless arrays ([121410b5](https://github.com/j4numbers/personal-website/commit/121410b52ebb842cae8c605d54f8344927f14aae))
  *  added slashes to routes in folders ([f905cd47](https://github.com/j4numbers/personal-website/commit/f905cd473f2e0bf0c997cfe6a9e2cdb8248506a7))
* **routing:**  removed unused route set ([d91a875b](https://github.com/j4numbers/personal-website/commit/d91a875b5775b429e8be2f407ed6ae54dd0bf3e6))
* **config:**  added custom env vars to the repo ([240d2917](https://github.com/j4numbers/personal-website/commit/240d2917f3163e6a5ea16d1c20b16a5f73115646))
* **eslint:**
  *  convert to single quote strings for usage reasons ([c86e621f](https://github.com/j4numbers/personal-website/commit/c86e621f9a15bc8a2ada9654d5b62ada083e8e2c))
  *  minor eslint fixes across the project ([d23019a5](https://github.com/j4numbers/personal-website/commit/d23019a5e4fc8dd86f6cd16e3cd80f1ee22a41d4))
* **year:**  Year up! ([ca4d162b](https://github.com/j4numbers/personal-website/commit/ca4d162bcc90f1cd4ae28bb371d2b7a25cf8fed8))
* **gitignore:**  added built file to the ignore list ([b4949c5f](https://github.com/j4numbers/personal-website/commit/b4949c5f84cd0deecd9c92e56569b1f5ea9557f0))
* **auth:**  extended the admin cookie lifetime and changed names around ([9172e9d7](https://github.com/j4numbers/personal-website/commit/9172e9d75603a24abaeb8d2638fbdc8c9dc7d5be))
* **hash:**  updated the me hash ([fb13bb1d](https://github.com/j4numbers/personal-website/commit/fb13bb1d96d244521419e386b2eef07d271c8d96))

##### Continuous Integration

* **aws:**  add aws deployment workflow ([2a643168](https://github.com/j4numbers/personal-website/commit/2a643168a740c572bcdc963f441a1cbbdeae78c0))
* **node:**  add node actions for testing ([03915aca](https://github.com/j4numbers/personal-website/commit/03915acae473d77d91f0d15a0a58b2bec1015960))
* **terraform:**  add in a few more details to the terraform areas ([88f99c52](https://github.com/j4numbers/personal-website/commit/88f99c5202caddeae37826e7cf097c0e72a45632))

##### Documentation Changes

* **readme:**
  *  reduce list of current things ([a85715ec](https://github.com/j4numbers/personal-website/commit/a85715ec002db3ef03330194f98edec9b8f2cbb2))
  *  filled in the readme with a large chunk of info ([a6551c94](https://github.com/j4numbers/personal-website/commit/a6551c94de9f0ed3403fc970eed4fddf6c792c7f))
*  drafted a set of static page data sets ([395f99e1](https://github.com/j4numbers/personal-website/commit/395f99e1e325240e73d869636ffa5f73a0092e2d))
*  found a new anime and manga source ([e03e8f7f](https://github.com/j4numbers/personal-website/commit/e03e8f7f5ee8bc7f3f944e2df487ed3fac45fcb2))

##### New Features

* **typescript:**  bring in typescript and move over anime slowly ([4167ba88](https://github.com/j4numbers/personal-website/commit/4167ba8843baa7aa1fb12cd69ecb0af88ad28205))
* **greet:**  added hello message and removed event roles ([04ccca1d](https://github.com/j4numbers/personal-website/commit/04ccca1da37f4579d6ec90f165c5adb667819070))
* **kink:**
  *  strip out kinks entirely from the code ([0b8ca9cd](https://github.com/j4numbers/personal-website/commit/0b8ca9cdfda2c2603da4d62e17c6e32e4c9404df))
  *  added deletion ability for kinks ([65ddfcf8](https://github.com/j4numbers/personal-website/commit/65ddfcf854121a71dea9a6ee0aaed35afd8b2789))
  *  added edit functionality to kinks ([004ad9e2](https://github.com/j4numbers/personal-website/commit/004ad9e2af361d1378f0ac1b4e2250ae832e5686))
  *  added categorisation for kinks ([d4533dd1](https://github.com/j4numbers/personal-website/commit/d4533dd1ba0b8347d2c9c098ce85f1488db2d745))
  *  added a single kink page that needs some restyling soon ([99df9a6f](https://github.com/j4numbers/personal-website/commit/99df9a6f794d608688b1afa833183036051c1424))
  *  got the kink view page working properly again ([933326d1](https://github.com/j4numbers/personal-website/commit/933326d197f8632540d390cbae5c60c3dc2247a4))
* **handle:**  add updated handle ([941833f7](https://github.com/j4numbers/personal-website/commit/941833f700db5a1f4b73303c77c92d0853a6359d))
* **blog:**
  *  remove explicit promises from the site in favour of async/await ([970421eb](https://github.com/j4numbers/personal-website/commit/970421ebaa430d05ef24119025b82d7dcfd941e6))
  *  bring in all admin blog functionality into restify ([3cc6926a](https://github.com/j4numbers/personal-website/commit/3cc6926a4735edf2a29e0ee2797322dc7ea3cfa4))
  *  bring blogging back into the infrastructure ([535b411f](https://github.com/j4numbers/personal-website/commit/535b411f115bef32858f93c9ebb5d168b32db835))
* **kinks:**  bring in kinks to the site and finish porting to restify ([65e6883a](https://github.com/j4numbers/personal-website/commit/65e6883a073d8cfccb5def956c013c3444c7f36e))
* **me:**
  *  almost complete renovating the me subsite ([608eda59](https://github.com/j4numbers/personal-website/commit/608eda590b04f51ac916a6a7d0a0f259c6c731cf))
  *  started another sub-site area for private stuff ([125409ef](https://github.com/j4numbers/personal-website/commit/125409efe3d07f2046471a2ab6f52fcc0547a479))
* **chapters:**
  *  add support to upload chapters to the stories ([66d356ee](https://github.com/j4numbers/personal-website/commit/66d356ee469c2b7a53e088f08963d65856250a0c))
  *  linked in the admin pages for chapters ([a3231cc3](https://github.com/j4numbers/personal-website/commit/a3231cc30f48a3aab5b772ed3c89c9569bd1835c))
  *  added pages of chapters instead of a chapter dump ([d76c7c85](https://github.com/j4numbers/personal-website/commit/d76c7c85b8a4206d84023cba5416d3027902f80d))
  *  added a view to look at the chapter ([3e2e29e9](https://github.com/j4numbers/personal-website/commit/3e2e29e94d466c3afb8ec195c29db9d130a61f22))
* **stories:**
  *  add in the story site to restify at the top book level ([73ab99c0](https://github.com/j4numbers/personal-website/commit/73ab99c083be91e3e24dc9f8bbe0dfc5309b46be))
  *  added stories to the sitemap ([b54eab24](https://github.com/j4numbers/personal-website/commit/b54eab24315c3f4207f1cbe3f92d9f99cd693129))
  *  editing now works on a majority level with some issues ([cc062685](https://github.com/j4numbers/personal-website/commit/cc0626855c2f5e9a468d001b6484aa09c9b62c0c))
  *  added a base stories page for all stories ([fbb1fdb1](https://github.com/j4numbers/personal-website/commit/fbb1fdb1dd3419265b3c6f180dc39f3264fa4a03))
  *  added database handlers for stories ([813741e9](https://github.com/j4numbers/personal-website/commit/813741e9be44b9f23364f609c9a8db02da94eb61))
* **manga:**
  *  add in manga subsite to the site ([4aa9ba8d](https://github.com/j4numbers/personal-website/commit/4aa9ba8d7be014d1182dcc0990c041618eee6d71))
  *  added manga in to the mix properly too now ([105ec001](https://github.com/j4numbers/personal-website/commit/105ec001fd7c2cd1c61a836e900f42ea323c1199))
  *  added admin pages for the manga subsite ([00fe6c96](https://github.com/j4numbers/personal-website/commit/00fe6c96ab5c61a51363bcc9c516bae43bd0cd90))
  *  added in the handlers for the manga database ([24d09791](https://github.com/j4numbers/personal-website/commit/24d0979102b9aa24819c75c08d347bba7bd85f73))
  *  added templates for the manga project area ([a8d49167](https://github.com/j4numbers/personal-website/commit/a8d491676b72c9208529a6aaa2d4656e8640183f))
* **art:**
  *  brought the art subsite into restify ([53239c18](https://github.com/j4numbers/personal-website/commit/53239c18f1789ded619caf22e700d7135f93af60))
  *  added in the art view pages ([6abc2005](https://github.com/j4numbers/personal-website/commit/6abc2005adb653bb212c37ce511d15e6737a5712))
* **anime:**
  *  bring in the administrator tools for administrating anime ([54660c15](https://github.com/j4numbers/personal-website/commit/54660c150e2ed77b0b8fe03aeb2e43694a14f51c))
  *  bring in the front portion of the anime sub-site ([fecc3c46](https://github.com/j4numbers/personal-website/commit/fecc3c465571ddfdfb91afd40ef176f0fd66461d))
  *  anime is now imported properly and displayed ([7c2f67d7](https://github.com/j4numbers/personal-website/commit/7c2f67d70b6d8b5836222f1a27df8d4a68b68c43))
* **statics:**
  *  completed admin edits for static documents ([88b9172a](https://github.com/j4numbers/personal-website/commit/88b9172a8676765fafa0a9b7e63d467120b1db72))
  *  partial progress of static data into restify ([8871a493](https://github.com/j4numbers/personal-website/commit/8871a493844f29528be57dcf0eb4c3591238fb7a))
  *  started decent work on filling in a list in sitemap ([0092109c](https://github.com/j4numbers/personal-website/commit/0092109c9efab85dae615a318cd989b72bfe384b))
  *  added view list of static items ([15c21b17](https://github.com/j4numbers/personal-website/commit/15c21b1792fcbf4c67e6e577954fcab3c6aef655))
  *  editing a static document is now possible ([c473682f](https://github.com/j4numbers/personal-website/commit/c473682f832fe36fc364e146d5455c23d27f6353))
* **search:**
  *  added in searching to the restify queue ([7d47a5eb](https://github.com/j4numbers/personal-website/commit/7d47a5eb899a0d43c2ee211dda5676ff5f06e01d))
  *  searching is now a thing by the tags ([67603f7b](https://github.com/j4numbers/personal-website/commit/67603f7b64dbc8aa6150f2468785c9b660c0ed3e))
  *  added the start of a search page ([e1d6bc60](https://github.com/j4numbers/personal-website/commit/e1d6bc60a1c3d6cf145baab50b70cf1bed5d86bc))
* **projects:**  convert projects subsite into restify ([1b401abe](https://github.com/j4numbers/personal-website/commit/1b401abe9a1060ca6746aea9549ac7a22da55a9a))
* **first-page:**  added in homepage to the site so it resolves ([a4977fec](https://github.com/j4numbers/personal-website/commit/a4977fecc06d5c6d8199515ed3919f28d1e11c00))
* **cache:**  added a file caching option for when redis is not in use ([398011a9](https://github.com/j4numbers/personal-website/commit/398011a92d91964a9e112a0eea5e470f11dd9183))
* **sessions:**
  *  brought redis along for the ride to some mixed success ([b405389f](https://github.com/j4numbers/personal-website/commit/b405389f0ccd2a476d679d9922e672be4765a8d1))
  *  brought in a Redis cache class and factory ([f1e368da](https://github.com/j4numbers/personal-website/commit/f1e368da6aeeb3c8bb9cb52d3e46479c4128457b))
  *  started moving over to backed sessions ([c552cb13](https://github.com/j4numbers/personal-website/commit/c552cb13a74e3a27c12bad43c251a108b1904068))
* **contact:**  added edit capabilities to the contact me items ([4e59fe7e](https://github.com/j4numbers/personal-website/commit/4e59fe7e4479d4263497c2f48dabd99ef349ffd4))
* **edit-list:**  added some edit work for list statics ([5df514e0](https://github.com/j4numbers/personal-website/commit/5df514e077998efe65ceab5440b25a172d600608))
* **question:**  brought the me question out into config ([3c395a6f](https://github.com/j4numbers/personal-website/commit/3c395a6ffacc4d6b3e0445aee50009a263c04ac6))
* **stats:**  added in a very basic statistical page ([cdf5fcce](https://github.com/j4numbers/personal-website/commit/cdf5fcce49ab5b92efd8ea01c9cedf001d9851dc))
* **deletion:**  added deletion of chapters ([0572b428](https://github.com/j4numbers/personal-website/commit/0572b4288e2590134b1fbf9a0a9cd386da0a6508))
* **chapter-edit:**  added edit functionality for chapters ([d0bdcd70](https://github.com/j4numbers/personal-website/commit/d0bdcd7031c27057ef028027fc00f5524e2ab120))
* **view:**  added a view single chapter in the admin section ([cfd5e06d](https://github.com/j4numbers/personal-website/commit/cfd5e06d1c66f66e88a8b06d7ea546ddfb66555f))
* **story:**  expanded a template for a single story and chapters ([14108886](https://github.com/j4numbers/personal-website/commit/141088862ce3bee98cb8cc0d4481cbf9c510bcdf))
* **admin:**
  *  added story creation to the admin section ([df037fcc](https://github.com/j4numbers/personal-website/commit/df037fccb779033ca962cb7a2e8c0c82dce7760a))
  *  added the admin page for viewing an existing kink ([1f44e149](https://github.com/j4numbers/personal-website/commit/1f44e1491c55c6798553731ced5a4eb42efdb21c))
  *  wired in the kink stuff to a database and the admin for it ([e4517317](https://github.com/j4numbers/personal-website/commit/e4517317e78682eccde3339b35c0188d8427726d))
* **writing:**  drafted a db structure for stories and chapters ([1b0df928](https://github.com/j4numbers/personal-website/commit/1b0df9280551e98f3f55ebe80965c590133172f7))
* **sitemap:**
  *  added the art page to the sitemap data ([6f0f795d](https://github.com/j4numbers/personal-website/commit/6f0f795dbf78cd4bd9200339397ad1025c72c2a0))
  *  data-fied the sitemap ([455139a7](https://github.com/j4numbers/personal-website/commit/455139a7180975a515e9e5b02bcf24ed66e896c3))
* **art-admin:**  added the administration tools for uploading art ([7f2b9bb1](https://github.com/j4numbers/personal-website/commit/7f2b9bb16036243ce5c3747c37b96aed71001a0d))
* **kink-warn:**  added a warning page for looking at kinks ([65ffcab7](https://github.com/j4numbers/personal-website/commit/65ffcab700c8487735d5192b730c858e98ea8c16))
* **js:**  added refresh capability to the anime and manga admin screens ([57f2970d](https://github.com/j4numbers/personal-website/commit/57f2970dd2569af15969e864e138a961653cc4e9))
* **anilist:**  start working on the actual link to live sites ([9ddb994a](https://github.com/j4numbers/personal-website/commit/9ddb994ae2c3b57a1174471f329731cf46ab1962))
* **me-blog:**
  *  added the extended blog properly into the system ([838e66b6](https://github.com/j4numbers/personal-website/commit/838e66b6f2b59c7d2dab9db73ee5c5f4b591e50c))
  *  added a stub for getting the private blog ([c4e7e4cb](https://github.com/j4numbers/personal-website/commit/c4e7e4cbaaf28c8b772cd4edab13bba7384e9122))
* **about-me:**  added an alternative about me page on the me subsite ([601b2320](https://github.com/j4numbers/personal-website/commit/601b2320409db52ab7993ddf55db97448db648c9))
*  static-ified contact options properly ([c203c49d](https://github.com/j4numbers/personal-website/commit/c203c49d6fc1e6cd41c3df6e69164e6605ec35d4))
*  wrote in the about me and contact me details into the flat files ([4e17c97a](https://github.com/j4numbers/personal-website/commit/4e17c97a54917be3bc43a1aea9a4caca645f0239))
*  dragged about me into a static collection ([6eab23b2](https://github.com/j4numbers/personal-website/commit/6eab23b26a269796b0b58baa9e61db3fdc6dcf90))
*  added editing functionality properly ([3850487c](https://github.com/j4numbers/personal-website/commit/3850487c4ea7ef24d1f83dd89cf09064f2613fd1))
*  added edit view for an anime in the admin section ([56fcf0ab](https://github.com/j4numbers/personal-website/commit/56fcf0abbc1cb6b9ca702869fb359022d00c5803))
*  added single-anime view page in the admin space ([3fcb08d3](https://github.com/j4numbers/personal-website/commit/3fcb08d370f6dc66007115d3cf2fb193c78eda74))
*  started adding admin page for anime ([076662d4](https://github.com/j4numbers/personal-website/commit/076662d47b481b78182e782044e98e846492b1b6))
*  styled a view of a single show and added in tags ([98d100a2](https://github.com/j4numbers/personal-website/commit/98d100a23879e3ffb4f191ce2fe884611e4314ef))
*  brought in doc changes to actual specs ([75daae48](https://github.com/j4numbers/personal-website/commit/75daae48784814df03b424bf61951e0be3e13117))
*  simplistic anime handler and pages have been added ([89c92fa6](https://github.com/j4numbers/personal-website/commit/89c92fa640db08068f5b20af0492ab448d5b1b83))
*  made a first shot of defining data for hobbies ([fcb6cd96](https://github.com/j4numbers/personal-website/commit/fcb6cd964a3b912622d778f35d66174334e5cc13))
*  brought in the hobbies central page ([10d743f2](https://github.com/j4numbers/personal-website/commit/10d743f212451df08cba8e26bb2b7b8d69c571cf))
*  re-wired all the project pages back together to work properly ([47cdb427](https://github.com/j4numbers/personal-website/commit/47cdb427029430c9633aa36ebaeb482dc4f0bfe7))
*  started work on dragging in the admin pages for dev projects ([41d25072](https://github.com/j4numbers/personal-website/commit/41d2507279484c3e0a487ec4fa3b2c2d49fe4dd1))
*  brought in the develop viewing pages ([60cfe092](https://github.com/j4numbers/personal-website/commit/60cfe0923f9c079d017a64a2f9826adcd68a0ca9))
*  created a new model for development projects ([95c62522](https://github.com/j4numbers/personal-website/commit/95c62522b3193f66617db7421c3c97b75c218d60))
*  added the ability to create a new blog post from scratch ([7befe45f](https://github.com/j4numbers/personal-website/commit/7befe45fea39394133397411666cb3d8e838ba0c))
*  added delete functionality to the blog system ([13314c93](https://github.com/j4numbers/personal-website/commit/13314c93345ec8a7c039a7d91842640d54a50241))
*  added viewing and editing a blog post through the admin screens ([8dbad79e](https://github.com/j4numbers/personal-website/commit/8dbad79e58614b9798801fbbf7d0561ba66b800a))
*  added individual blog posts to the admin view screen ([2e1da790](https://github.com/j4numbers/personal-website/commit/2e1da790e4c1a5a50fc515a988ba873f3b6cb7e3))
*  re-nested the admin page slightly to have sections ([1c6ac06e](https://github.com/j4numbers/personal-website/commit/1c6ac06e388583a42cb8d4381b14011b7f3e1906))
*  added an admin page which takes a password ([b567963e](https://github.com/j4numbers/personal-website/commit/b567963eb44debb9916be7529bc5c8b8deefe93c))
*  sorted the blog in reverse time posted order ([aa7018c4](https://github.com/j4numbers/personal-website/commit/aa7018c4786fee599996b576e677cf4f0450e2ff))
*  wired in total count to the view ([39ef3836](https://github.com/j4numbers/personal-website/commit/39ef38363a18f3bc92e0d760feff4ad325d926b3))
*  added basic pagination for a start ([17601cde](https://github.com/j4numbers/personal-website/commit/17601cdedfc82f690fa9f618ea84032fdfb23025))
*  basic blogging has now been drafted in ([e66b0ece](https://github.com/j4numbers/personal-website/commit/e66b0ecea09caaaa1f4e7e0e4804c14c379a043d))
*  added a Contact Me page that bears striking similarities to the old one ([abf628ac](https://github.com/j4numbers/personal-website/commit/abf628acd90623e70c1791126e264dafac782fd5))
*  added the previous about page to the site ([6f65ee7e](https://github.com/j4numbers/personal-website/commit/6f65ee7eb9e15eb47ec4a9059269045dc10b5f80))
*  added the sitemap into the mix ([40561e78](https://github.com/j4numbers/personal-website/commit/40561e789a5f7f0635ba185990ff9d11d0a8d834))
*  reverted to an older UX design ([3a365f5e](https://github.com/j4numbers/personal-website/commit/3a365f5ef6c51d3155b7753be09b81c1ea6dac66))
*  added image files ([93d0f3b2](https://github.com/j4numbers/personal-website/commit/93d0f3b288248c40734e0a30f220329c12ec1b85))

##### Bug Fixes

* **blog:**  fix blog visibility fetching ([95bf8c58](https://github.com/j4numbers/personal-website/commit/95bf8c5857a448a87e1b0163fe9d24767e894b38))
* **mongo:**  update mongoose bindings ([44f7e20a](https://github.com/j4numbers/personal-website/commit/44f7e20ad321ec3dcb06e05e9e8c7009950528fb))
* **leaks:**  ignore generator leak ([8bfc86c5](https://github.com/j4numbers/personal-website/commit/8bfc86c570b7c2b3da17bbd52d49023f86759ee0))
* **import:**  ensure imports resolve to the same class ([7a64d7fd](https://github.com/j4numbers/personal-website/commit/7a64d7fdacb9d6536401e561c301962385e1672e))
* **pages:**  update require links in all pages ([9bbd16b0](https://github.com/j4numbers/personal-website/commit/9bbd16b046759075251323b563ac97914fba61c9))
* **style:**  large rejig to fix bootstrap changes and retire font awesome ([be6e5fea](https://github.com/j4numbers/personal-website/commit/be6e5fea47dcb9d89646d398b39b40443a1e79ec))
* **me-overview:**  show static text properly ([c65edc3d](https://github.com/j4numbers/personal-website/commit/c65edc3daa6e2614a1c9de55368609a33e52dd20))
* **site:**  close up any fixes to the site caused by refactor ([3b54e542](https://github.com/j4numbers/personal-website/commit/3b54e542ce348559b3d6e4942f7cc44580ab9af2))
* **version:**  include the version of the app into the stats page ([decfd43d](https://github.com/j4numbers/personal-website/commit/decfd43dfc3850dfc8dc6408851e69ff9cc11632))
* **redis:**  correct redis session management to roll forwards ([b3d816b8](https://github.com/j4numbers/personal-website/commit/b3d816b843381fae22fe4db770de33824b495226))
* **mongodb:**  brought the mongoose code up to date with new changes ([cb82e50e](https://github.com/j4numbers/personal-website/commit/cb82e50ed708ba5e204c3c01cba910c4c658e84d))
* **friends:**  fixed the friend checking code with caches ([3a306b64](https://github.com/j4numbers/personal-website/commit/3a306b6465fcab6922efdf59902b6f626c082d7a))
* **sitemap:**
  *  editing a sitemap is now live (woop!) ([8a5af118](https://github.com/j4numbers/personal-website/commit/8a5af1186b6f0ba44346834dd24f57c56298c487))
  *  fixed the 404 that had a very obvious fix ([bd601e8f](https://github.com/j4numbers/personal-website/commit/bd601e8f22c52d1e2759eeeaa0ae076fd8aa3424))
* **statics:**  allowed statics to default to blank ([bf65bfa4](https://github.com/j4numbers/personal-website/commit/bf65bfa4f124d8a925e15c94425041e3ff582aec))
* **deletion:**  deleting chapters now removes them from the total chapter count ([b920d061](https://github.com/j4numbers/personal-website/commit/b920d06163a6139b4ffdbb5495a6ccc1337e5092))
* **chapters:**  fixed sorting the chapters to be in the right order ([96aac16a](https://github.com/j4numbers/personal-website/commit/96aac16a045288e4afe0744e896f66cb8cba79ba))
* **art-view:**  fixed the view of art in the main site ([398c3082](https://github.com/j4numbers/personal-website/commit/398c308289e8a1e008a1ac21339305c38786d90c))
* **templates:**  null replacements in the templates ([69b3f2eb](https://github.com/j4numbers/personal-website/commit/69b3f2eb8397b16dd685a9a18d5da6f25ae71134))
* **anilist:**  fixed the handlers to talk to anilist normally ([cbde04ce](https://github.com/j4numbers/personal-website/commit/cbde04cec110dbaf7c5aab63faef7cf21e48685e))
*  fixed total count not returning and added logging in ([7e729b35](https://github.com/j4numbers/personal-website/commit/7e729b351dfd7b0069a43e9b6ce59096cf6e7dd7))
*  standardised error handling to a degree ([6b5ef64d](https://github.com/j4numbers/personal-website/commit/6b5ef64d177bb6f2d069b28ee87d7835af647690))
*  added the update time properly to blogs ([98555593](https://github.com/j4numbers/personal-website/commit/98555593f8d7bed5a789eba40195ba86cfef28f1))
*  wired up the links between other pages and the admin toolkit ([67649824](https://github.com/j4numbers/personal-website/commit/67649824839369b2b6c3a6ae42a5c0e0b3afdb17))
*  tail end of pagination is now functional ([50a6f742](https://github.com/j4numbers/personal-website/commit/50a6f742df7eadd1f78b4158f477945b16e04ebf))

##### Other Changes

* **story:**  moved writing subsystem into typescript ([d7215e42](https://github.com/j4numbers/personal-website/commit/d7215e42d3f65b63dc589d30092aa016afc93754))
*  origin/nodejs ([d5051931](https://github.com/j4numbers/personal-website/commit/d5051931114bd2c1ea4fe73dc7d11bbb386b4e0e))

##### Refactors

* **404:**  delegate generation of the 404 object ([44a288ff](https://github.com/j4numbers/personal-website/commit/44a288ff2bfabcc71f879ca3dfb20535642e54dc))
* **date:**  move over to luxon ([924a34a4](https://github.com/j4numbers/personal-website/commit/924a34a4f06f52fe9231ebad560478c0b139fcfe))
* **eslint:**
  *  minor fixes to most eslint issues ([1f0198a5](https://github.com/j4numbers/personal-website/commit/1f0198a58b784192e9598d72e6dc9d893c829d5d))
  *  continued minor eslint fixes ([6ad481b2](https://github.com/j4numbers/personal-website/commit/6ad481b278a32022dd7c52bf56124e92b4198bcb))
* **routes:**  move away from separate journey structures ([ee294831](https://github.com/j4numbers/personal-website/commit/ee294831484718bb5edacf075164088e05afaecd))
* **jwt:**  folded jwt operations into typescript ([9feb5beb](https://github.com/j4numbers/personal-website/commit/9feb5beb2e512dc9a81bcdce84627294ac16d347))
* **statics:**  move static documents over to typescript ([68150a68](https://github.com/j4numbers/personal-website/commit/68150a6826db0d2a30738a42f483afcbbe1325e4))
* **project:**  move project subsystem over to typescript ([e27a33cc](https://github.com/j4numbers/personal-website/commit/e27a33cc71154388cbda102d866a47636a810733))
* **blog:**  move blog subsystem over to typescript ([52aa3284](https://github.com/j4numbers/personal-website/commit/52aa328483464643d544ce3997e9462f4a440892))
* **art:**  move over to using typescript for art lookups ([ae4b8948](https://github.com/j4numbers/personal-website/commit/ae4b89484d6e2580bf97446b210359161fcaecaf))
* **scrape:**  moved anilist scrape into typescript ([e1c0b953](https://github.com/j4numbers/personal-website/commit/e1c0b9532bdd43e5f5952704ebf5f8654aff252c))
* **manga:**  move manga over to typescript ([8cb5b5e8](https://github.com/j4numbers/personal-website/commit/8cb5b5e8b5b9c95d8be6cfa549c95a38b51aebe9))
* **anime:**
  *  remove plain js anime handler ([c7268a44](https://github.com/j4numbers/personal-website/commit/c7268a4413e2dad9ef2c1cbd415aa3de4b56c472))
  *  move anime into async/await ([2a2d84e3](https://github.com/j4numbers/personal-website/commit/2a2d84e340a2d1296dcca91e091e35f19d03655d))
* **sitemap:**  make the plain sitemap dynamic ([4c0c120a](https://github.com/j4numbers/personal-website/commit/4c0c120a5edce9d9252491a0a2c14449006372a1))
* **tags:**  reduce tags if they're empty ([fdb96f03](https://github.com/j4numbers/personal-website/commit/fdb96f03236c1e5f7a74eb11f9e7320da78f3396))
* **journeys:**
  *  covered most eslint issues throughout the codebase ([d7db9475](https://github.com/j4numbers/personal-website/commit/d7db9475295dfcfe0d36bf543837cebf9189a73b))
  *  run through and eslintify half of the journey ([1c4b47c7](https://github.com/j4numbers/personal-website/commit/1c4b47c7ddba1dd1c4ce07226a1f02ef87524b20))
* **handlers:**  run through and eslintify the handler classes ([5282af13](https://github.com/j4numbers/personal-website/commit/5282af1347917eaf475551d07b6cd8214f31f951))
* **admin-story:**  split out the admin story handlers into files ([9a2c2f8e](https://github.com/j4numbers/personal-website/commit/9a2c2f8e1d9d6252071e23d065d4b23d4e8bcae7))
* **admin-static:**  split out the admin static handlers into files ([3f5fb2d6](https://github.com/j4numbers/personal-website/commit/3f5fb2d639410922ff7614a77513031e575f5d77))
* **admin-project:**  split out the admin project handler into files ([a0535b37](https://github.com/j4numbers/personal-website/commit/a0535b37d5e73129290b9d39342cc84b0513f7f3))
* **admin-manga:**  split out the admin manga handler into files ([11534f92](https://github.com/j4numbers/personal-website/commit/11534f927c2eb3b681e68d758f2c9aa5d9f7e871))
* **misc:**  minor eslint fixes to the codebase ([aac0887b](https://github.com/j4numbers/personal-website/commit/aac0887ba36da25d9f27cd38c23873e73fbb3b6f))
* **admin-kinks:**  split out the admin kink handler into files ([7b5284d7](https://github.com/j4numbers/personal-website/commit/7b5284d715995649d7bc784648332e39de7053f0))
* **admin-chapters:**  split out the admin chapter handler into files ([5ced2ebf](https://github.com/j4numbers/personal-website/commit/5ced2ebf23e53a58ee964145c908d347c6b945f7))
* **admin-blog:**  split out the admin blog handlers into files ([6e7edf60](https://github.com/j4numbers/personal-website/commit/6e7edf602bf78776ad58e8c712c66d330d6a6027))
* **copyright:**  change block comments to line comments ([51883454](https://github.com/j4numbers/personal-website/commit/51883454e56d60c94a9a35ab1ba42ac5e6461d9a))
* **indent:**  mass indent over for eslint ([c7c5492b](https://github.com/j4numbers/personal-website/commit/c7c5492ba49334866a65867f4c16063e73b999a0))
* **seo:**  move robots and sitemap into the repo properly ([0d45ea6f](https://github.com/j4numbers/personal-website/commit/0d45ea6fa4c19168d4959cecbe9b66aeff236157))
* **admin:**
  *  refactor out art into journey files with async/await ([b7621d52](https://github.com/j4numbers/personal-website/commit/b7621d52d6cb35913ab08f73661e9fc4d0e35522))
  *  minor changes to asyncify admin routes ([8cf19265](https://github.com/j4numbers/personal-website/commit/8cf19265d0f317a7fee8e7378af8912fe3259917))
  *  split out the admin login functionality ([a331d7cb](https://github.com/j4numbers/personal-website/commit/a331d7cb77dc5ca135a5259fc418175a6266090b))
  *  renested admin routes and views a bit ([ac5f9690](https://github.com/j4numbers/personal-website/commit/ac5f969060fa678c79afb9fd4373673bf3bace7b))
* **js:**  remove unused javascript functions ([dbdac8c4](https://github.com/j4numbers/personal-website/commit/dbdac8c4b0694ed394d5646bab8a22ef46563ec7))
* **image:**  remove unused images ([951d037c](https://github.com/j4numbers/personal-website/commit/951d037c9c99c32768a0a0d2aab805ab107d888a))
* **db:**
  *  move all handlers to async/await ([c88bd0a1](https://github.com/j4numbers/personal-website/commit/c88bd0a183803a17046b8e3f1152735e3fe884b8))
  *  move towards a refactor of mongoose to asyncify ([921a7c77](https://github.com/j4numbers/personal-website/commit/921a7c77eeac1e8a0fd9a602ce8dacd73fe5bec8))
* **admin-anime:**
  *  move admin anime to async/await ([77be04da](https://github.com/j4numbers/personal-website/commit/77be04da701f323eb167121e98531e526b3fc1e2))
  *  split apart routing from logic ([e330ae4d](https://github.com/j4numbers/personal-website/commit/e330ae4d2d8beeedbe251f972e827f011e9bb21a))
* **front:**  all front screens are now asyncified ([a679af2e](https://github.com/j4numbers/personal-website/commit/a679af2e6ded54db1fefb75a5ead0d4e61925fde))
* **fronts:**  continue refactoring out straight promises ([45a153ff](https://github.com/j4numbers/personal-website/commit/45a153ff4188286d2c3eac7d0ed07cc723d92d45))
* **rebase:**  shift all files into a src directory structure ([d914e548](https://github.com/j4numbers/personal-website/commit/d914e548293882a6f82c24f66804e0ca4e0ca9da))
* **j4numbers:**  name rebase with J4Numbers being back ([534d3241](https://github.com/j4numbers/personal-website/commit/534d3241a02458478bb9380d70d700c267a56540))
* **search:**
  *  refine search criteria to return title names ([1be20052](https://github.com/j4numbers/personal-website/commit/1be2005226ea9948c29f4c280710d4d2ad3c3088))
  *  changed how the inner search looks slightly ([73b53be5](https://github.com/j4numbers/personal-website/commit/73b53be550f2ed6d91d71044ef1109219c70620d))
* **writing-route:**  split out the logic from the routing ([15b2b95e](https://github.com/j4numbers/personal-website/commit/15b2b95e2bbd7def1e3832653157d1b1922ab22b))
* **manga-route:**  split out the logic from the routing ([7f2efd5e](https://github.com/j4numbers/personal-website/commit/7f2efd5efb01dee8615d2609cce51113416ffef5))
* **art-route:**  split out the logic from the routing ([b6dbf647](https://github.com/j4numbers/personal-website/commit/b6dbf6470180e2dccbad87913426e367da1a2432))
* **anime-route:**  moved apart the logic from the routing ([aec5d88b](https://github.com/j4numbers/personal-website/commit/aec5d88b14279b5bf4f3dcf8fd7a8cca74900fc7))
* **static-routes:**  moved apart the logic from the routing ([8ae2c970](https://github.com/j4numbers/personal-website/commit/8ae2c97010949cb6952cd8c15ef3f74af38e5220))
* **search-route:**  moved apart the logic from the routing ([e1373c4d](https://github.com/j4numbers/personal-website/commit/e1373c4db07222f3b5059ff8a6970df3201f6ba2))
* **project-route:**  moved apart the logic from the routing ([3e224cfd](https://github.com/j4numbers/personal-website/commit/3e224cfd8830ecbcc42ac0c07e520b8ceb8e2711))
* **index-route:**  moved apart the logic from the routing ([13d5b8a6](https://github.com/j4numbers/personal-website/commit/13d5b8a6ec02422f60340fb8984ab09db88c503f))
* **blog-route:**  moved apart the logic from the routing ([a2ecb0bf](https://github.com/j4numbers/personal-website/commit/a2ecb0bfc6ebe6b7518939d96c0e837a89278ed8))
* **admin-routing:**  split out admin routing into its own controller ([3cf77caa](https://github.com/j4numbers/personal-website/commit/3cf77caac53f98e0113ee6de5bc9c37112b0c648))
* **friend-login:**  split apart the friend login journey ([fa79492e](https://github.com/j4numbers/personal-website/commit/fa79492e30c479b7551bb672c654d8352973776a))
* **my-kinks:**  moved functionality away from route files again ([6324d17e](https://github.com/j4numbers/personal-website/commit/6324d17e6ef0281436b601b457a57b4ff5730566))
* **extended-blog:**  drew out functionality to own functions ([a75b6602](https://github.com/j4numbers/personal-website/commit/a75b6602abb4aaa1da995b339d050a8ab371c028))
* **my-overview:**  move out rendering to its own function again ([cfb7b7d7](https://github.com/j4numbers/personal-website/commit/cfb7b7d75912b980af116ee383e9c3dc8955efe7))
* **hobbies:**
  *  renest hobbies routing. May have broken things. ([caa7d284](https://github.com/j4numbers/personal-website/commit/caa7d2845a2f7debc59a7efce350eb6c7f6f5972))
  *  removed tabletop gaming ([87e58b72](https://github.com/j4numbers/personal-website/commit/87e58b7255e95d508f37ddbbdcf8c373b8ef4c49))
* **routing:**  dragged the route handler apart a bit at the top ([30a040f5](https://github.com/j4numbers/personal-website/commit/30a040f579d240d036d09718e34b5c989bd7f2c9))
* **display-errors:**  moved the render of errors into a journey file ([25da3fdb](https://github.com/j4numbers/personal-website/commit/25da3fdb6997d9db8cd0e7058e2e1f29fd6fd77e))
* **logging:**  added configuration to the logging area ([75b3b82b](https://github.com/j4numbers/personal-website/commit/75b3b82b7ea089b62dc0776973165ce311cab83f))
* **story:**  added default images to stories ([47879c54](https://github.com/j4numbers/personal-website/commit/47879c54b4acb540ae0c4f1cf0311ee1ef88670a))
* **config:**
  *  configured db by config ([e90bd204](https://github.com/j4numbers/personal-website/commit/e90bd204e521043b1cf513684f236536b6882648))
  *  brought in configuration via files as opposed to code ([f45feeca](https://github.com/j4numbers/personal-website/commit/f45feeca7845ea7de99ef68b4ac792303bb37eb5))
* **story-image:**  removed requirement for images for stories ([0735242c](https://github.com/j4numbers/personal-website/commit/0735242c2f7944be943779f3714e38b0913f1aca))
* **edit:**  changed editing chapters to include the raw id ([4c4d3c24](https://github.com/j4numbers/personal-website/commit/4c4d3c24abcca693f64f208bea0589128aec52c1))
* **navigation:**  added immediate chapter navigation ([e07e4413](https://github.com/j4numbers/personal-website/commit/e07e44136bf6a989bf7d76c090f55f6875ff1bc8))
* **chapters:**
  *  changed the normal view of chapters too ([b91d4e32](https://github.com/j4numbers/personal-website/commit/b91d4e32385248e4fe4afd593d493354b94f54dc))
  *  changed the relationship between stories and chapters ([3aa7df5b](https://github.com/j4numbers/personal-website/commit/3aa7df5b70f3eecd359a41078bc3e4663aba394b))
  *  changed how chapters and stories are related ([f061810b](https://github.com/j4numbers/personal-website/commit/f061810b65c729ce73e7b2ed96c8d7e96a3fd2aa))
* **coming-soon:**  set remaining items to be coming soon ([6889108c](https://github.com/j4numbers/personal-website/commit/6889108c54ca4ad6c00c9e5ab455655b454e0c46))
* **interests:**  removed interests for now ([4534e702](https://github.com/j4numbers/personal-website/commit/4534e7026a0c5d6752e67f46d0678e52e4d44653))
* **nunjucks:**  added a filter for adding in markdown in nunjucks ([aee927dd](https://github.com/j4numbers/personal-website/commit/aee927dd157e070706364802a8439b647318153b))
* **pagination:**  pages now have a configurable size ([fbde960d](https://github.com/j4numbers/personal-website/commit/fbde960d223619c7cdc74ccbe5fa055f070e26b1))
*  removed delete functionality for anime ([954bdb7d](https://github.com/j4numbers/personal-website/commit/954bdb7d2e49c77cdd315ddc820b35f3ed676615))
*  routing redone ([019a9c0c](https://github.com/j4numbers/personal-website/commit/019a9c0caa3a34b20e3820849f85ccc222af1333))
*  nested route files in folders ([04d4c914](https://github.com/j4numbers/personal-website/commit/04d4c914f54f573a9a075b17e7c22d2e809d9fcc))
*  stripped out the navbar from the template ([10ffca98](https://github.com/j4numbers/personal-website/commit/10ffca98d62c3985577854dbf8da3048fbb0924e))
*  stripped out dev projects from the mongo handler too ([32b20861](https://github.com/j4numbers/personal-website/commit/32b20861d6f0b267ccd18c4cc0a7d89074a95bc5))
*  dragged the specifics of blogging out of the mongo layer ([9f4fe229](https://github.com/j4numbers/personal-website/commit/9f4fe229be512fb21f1be54f63489216c229dfd7))
*  re-routed the blog admin traffic down a new file ([a313d4b8](https://github.com/j4numbers/personal-website/commit/a313d4b82c449f262f38d7edf2e1b44112ed08ea))
*  re-nested admin templates ([d8d8ea2d](https://github.com/j4numbers/personal-website/commit/d8d8ea2d2cd719df48bfda733b32b11667639a5f))
*  renested the top banner a tad and added metadata to blogs ([176bb527](https://github.com/j4numbers/personal-website/commit/176bb5272315c84c7675f65919fe4d37d9b1fc50))
*  renested most of the templates ([aa1c4da9](https://github.com/j4numbers/personal-website/commit/aa1c4da9d4fca845370fc67ebcb1f95606a80be9))
*  removal of vue continues ([8c22f6eb](https://github.com/j4numbers/personal-website/commit/8c22f6eb38b3cc624ab121d6ad772a843c483960))

##### Code Style Changes

* **eslint:**
  *  remembered to turn on eslint ([68565760](https://github.com/j4numbers/personal-website/commit/68565760dac86efbf271607b51d076d14eedfec6))
  *  minor eslint fixes throughout ([b3ff7df5](https://github.com/j4numbers/personal-website/commit/b3ff7df56a0fe206d0df2197c22b9f773ed177de))
* **blockquote:**  added blockquote styling to the left ([b9bd368a](https://github.com/j4numbers/personal-website/commit/b9bd368a8543a0f489e72643c2031a0c980d7fd6))
* **image:**  change the handle image for all pages ([bfdf3152](https://github.com/j4numbers/personal-website/commit/bfdf3152b2153e50774c70da08b258f9ca88331f))
* **favicon:**  new favicons have been added ([af734752](https://github.com/j4numbers/personal-website/commit/af734752b5e6bb0e4140b5f6d9f5b86377dd7863))
* **footer:**  extended the footer down very slightly ([a06e0c30](https://github.com/j4numbers/personal-website/commit/a06e0c3062b45d6276a5be072d97a4a289ab73ac))
* **sass:**  remove deprecated functionality from scss files ([93d87613](https://github.com/j4numbers/personal-website/commit/93d876130a68b738cc796f8a5f9268e1a8d2e202))
* **admin-toolbar:**  added spacing for the admin toolbar ([39f47a28](https://github.com/j4numbers/personal-website/commit/39f47a28753d98d65db6428a23b523ed80f44c5b))
* **kink:**
  *  capitalised the practising status on the single kink screen ([a0527aaf](https://github.com/j4numbers/personal-website/commit/a0527aaf7366eaf97603dd1b55b2af9bc7b88ec4))
  *  minor page restyling for spacing ([44d02499](https://github.com/j4numbers/personal-website/commit/44d0249998f92fc61f679946055904a76d322bfa))
* **me:**  added two more headings for the me area ([2744e19d](https://github.com/j4numbers/personal-website/commit/2744e19dd0dc040abc2144fc0d405e9bf20f4a97))
* **layout:**  minor tweaks to the hobbies subsite ([c85f2229](https://github.com/j4numbers/personal-website/commit/c85f2229251ab6b473e86771bc12448287fccc1d))
*  restyled the anime main list and pagination partial ([bd4bdc65](https://github.com/j4numbers/personal-website/commit/bd4bdc65b531b9c2d66ff291b6d061ce2103f5ad))
*  filled in the flavour for the hobbies overview page ([7f79d7f9](https://github.com/j4numbers/personal-website/commit/7f79d7f94958536ee1ea2145016ca56e669fb89a))
*  added blank text for projects and fixed pagination being silly ([b84d3198](https://github.com/j4numbers/personal-website/commit/b84d3198fccbd464a1fc4580fbb93e8fd88c6a22))
*  added some words for when no blogs are found ([36531eb4](https://github.com/j4numbers/personal-website/commit/36531eb43d84913e0f5ce2e9470bcbfe1c76cc31))

##### Tests

* **app:**
  *  fixed up the default homepage test ([9f205ba0](https://github.com/j4numbers/personal-website/commit/9f205ba057481a2808f869ce711ef8790dd9fe1d))
  *  started writing a test for the routing ([f120e9d2](https://github.com/j4numbers/personal-website/commit/f120e9d2f673d1645e2179c61250e69d97ce9171))
* **npm:**  added in proxyquire for the future ([0c6b7236](https://github.com/j4numbers/personal-website/commit/0c6b72367b6a9d76ed9a0e89cbbe6788c323dd3b))
* **framework:**  brought in a testing framework for later ([de081340](https://github.com/j4numbers/personal-website/commit/de081340eee97ae9f6761127a0f1fbb052a5db0b))
* **mongo:**  added in an in-memory test mongo server ([56e679be](https://github.com/j4numbers/personal-website/commit/56e679be549b6cfa6a8a3fa23b1399016bca9a6b))

