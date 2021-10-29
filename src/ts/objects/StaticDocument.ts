export type StaticText = string;

export interface StaticSitemap {
  page_name: string,
  page_link: string,
}

export interface StaticContact {
  contact_method: string,
  contact_link: string,
  bs_icon: string,
}

export type StaticDocument = StaticText | Array<StaticSitemap> | Array<StaticContact>;
