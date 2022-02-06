export interface IAnnouncementBar {
  data: {
    id: number;
    attributes: {
      announcement: string;
    };
  };
}

export interface ICategory {
  id: number;
  attributes: {
    title: string;
    slug: string;
    dealsCount: number;
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
  };
}

export interface IFilterStat {
  dealsCount: string;
  title: string;
  slug: string;
}

export interface IFilterStats {
  categoryStats: IFilterStat[];
  lifetimeStats: IFilterStat[];
  mostUsed: { rows: { count: string; from_day: string; title: string }[] };
}

export interface ICategories {
  data: ICategory[];
}

export interface IMediaFormat {
  ext: ".png" | ".jpeg" | ".jpg";
  url: string;
  hash: string;
  mime: string;
  name: string;
  path: null | string;
  size: number;
  width: number;
  height: number;
}

export interface IMedia {
  data: {
    id: number;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      width: number;
      height: number;
      formats: {
        large: IMediaFormat;
        small: IMediaFormat;
        medium: IMediaFormat;
        thumbnail: IMediaFormat;
      };
      hash: string;
      ext: ".png" | ".jpeg" | ".jpg";
      mime: string;
      size: number;
      url: string;
      previewUrl: null | string;
      provider: "local" | any;
      provider_metadata: null | any;
      createdAt: Date;
      updatedAt: Date;
    };
  };
}

export interface IDeal {
  id: number;
  attributes: {
    title: string;
    description: string;
    overview: { overview_item: string }[];
    deals: { data: IDeal[]; meta: any };
    saved?: boolean;
    slug: string;
    deal_description: string;
    deal_usages: {
      data:
        | null
        | { attributes: { createdAt: Date; updatedAt: Date }; id: number }[];
    };
    createdAt: Date;
    updatedAt: Date;
    publishedAt: Date;
    type: "deal" | "coupon";
    affiliate_link: null | string;
    coupon_code: null | string;
    featured: null | boolean;
    categories: ICategories;
    banner: IMedia;
    brand: IBrand;
    usageCount: { count: string };
  };
}

export interface IDeals {
  data: IDeal[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IBrand {
  data: {
    id: number;
    attributes: {
      name: string;
      slogan: string;
      logo: IMedia;
      createdAt: Date;
      updatedAt: Date;
      publishedAt: Date;
      slug: string;
    };
  };
}

export interface IDealUsages {
  data: {
    id: number;
    deals: IDeal[];
  };
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface IUserProps {
  blocked?: boolean;
  confirmed: boolean;
  createdAt: Date;
  email: string;
  id: number;
  provider: "local" | any;
  strapiToken: string;
  updatedAt: Date;
  username: string;
}
