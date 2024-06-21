export interface UserDetailResponse {
    data:    UserDetail;
    message: string;
    success: boolean;
}

export interface UserDetail {
    admissionDate:    string;
    arlInsurance:     number;
    birthdate:        string;
    cesantias:        number;
    email:            string;
    healthyInsurance: number;
    id:               number;
    identifier:       number;
    isActive:         number;
    lastName:         string;
    name:             string;
    password:         string;
    pension:          number;
    positionName:     string;
    privileges:       number;
    retirementDate:   null;
    salary:           number;
    username:         string;
}
