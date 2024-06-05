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

export interface ResultsSelectionResponse {
  message: string;
  results: {
    sems: string[];
    years: string[];
  };
}

export interface ResultResponse {
  message: string;
  personal_data: {
    date: string;
    indexNo: string;
    name: string;
    option: string;
    programme: string;
    studentId: string;
    username: string;
    year: string;
    sem: string;
  };
  results: {
    course_code: string;
    course_name: string;
    credits: string;
    grade: string;
    total_mark: string;
  }[];
  summary: {
    credits_calculated: {
      cumulative: string;
      semester: string;
    };
    credits_obtained: {
      cumulative: string;
      semester: string;
    };
    credits_registered: {
      cumulative: string;
      semester: string;
    };
    cwa: {
      cumulative: string;
      semester: string;
    };
    weighted_marks: {
      cumulative: string;
      semester: string;
    };
  };
  trails: string[];
}
