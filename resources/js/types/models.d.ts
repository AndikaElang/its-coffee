export interface paginatedData<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface User {
  id: number | string;
  role?: string;
  roles: {
    id: number;
    name: RoleName;
    guard_name: string;
    permissions: {
      id: number;
      name: string;
      guard_name: string;
      created_at: string;
      updated_at: string;
      pivot: {
        permission_id: number;
        role_id: number;
      };
    }[];
    pivot: {
      model_id: string;
      model_type: string;
      role_id: number;
    };
  }[];
  avatar?: string; // image from laravel-medialibrary
  featured_image?: string; // image from laravel-medialibrary ???
  name?: string;
  username?: string;
  email?: string;
  image?: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
  password?: string;
  // password_confirmation?: string; // ??? why this is here
}

export interface Media {
  collection_name: string;
  conversions_disk: string;
  disk: string;
  file_name: string;
  generated_conversions: {
    [key: string]: {
      conversion: string;
      disk: string;
      file_name: string;
      mime_type: string;
      size: number;
    };
  };
  custom_properties: {
    [key: string]: any;
  };
  id: number;
  manipulations: {
    [key: string]: {
      crop?: {
        height: number;
        width: number;
        x: number;
        y: number;
      };
      fit?: {
        height: number;
        width: number;
      };
      resize?: {
        height: number;
        width: number;
      };
    };
  };
  mime_type: string;
  model_id: number;
  model_type: string;
  name: string;
  order_column: number;
  responsive_images: {
    [key: string]: {
      conversion: string;
      disk: string;
      file_name: string;
      mime_type: string;
      size: number;
    };
  };
  original_url: string;
  preview_url: string;
  size: number;
  updated_at: string;
  uuid: string;
}

export interface Role {
  _method?: string;
  id: string;
  name: string;
  guard_name: string;
  enable_all: boolean;
  description: string;
  created_at: string;
  updated_at: string;
}

export type Permission = {
  name: string;
  active?: boolean;
  permission: {
    name: string;
    active?: boolean;
  }[];
};

export interface PushNotification {
  id: number;
  title: string;
  body: string;
  url: string;
  is_read: boolean;
  user_id: number;
  created_at: string;
  updated_at: string;
}

export interface Menu {
  id: number;
  name: string;
  base_price: number;
  it_price: number;
  deposit: number;
  is_available: boolean;
}

export interface Order {
  id: number;
  order_date: string;
  buyer_name: string;
  buyer_type: string;
  payment_type: string;
  is_paid: boolean;
  extra_cup: boolean;

  menu_id?: number;
  name?: string;

  qty?: number;
  price?: number;
  subtotal?: number;
}

export interface OrderDetail {
  id: number;
  order_id: number;
  menu_id: number;
  qty: number;
  price: number;
  subtotal: number;
}

export type Expense = {
  id: number;
  type: string;
  description: string;
  amount: number;
  created_at: string;
  updated_at: string;
};
