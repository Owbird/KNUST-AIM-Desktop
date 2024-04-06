export interface UserAuthResponse {
  message: string;
  token?: string;
}

export interface UserDataResponse {
  message: string;
  user_data: UserData;
}

export interface UserData {
  contact: {
    alt_personal_mobile: string;
    knust_mobile: string;
    personal_email: string;
    personal_mobile: string;
    postal_address: string;
    residential_address: string;
    school_email: string;
  };

  personal: {
    country: string;
    date_of_birth: string;
    gender: string;
    other_names: string;
    region: string;
    religion: string;
    surname: string;
    username: string;
  };

  programme: {
    indexNo: string;
    programme_stream: string;
    studentId: string;
  };
}
