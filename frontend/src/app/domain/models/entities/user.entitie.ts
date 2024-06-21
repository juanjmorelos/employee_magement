export interface LoginUserResponse {
    data:    UserData;
    message: string;
    success: boolean;
}

export interface UserData {
    admissionDate:        string;
    arlInsurance:         string;
    birthdate:            string;
    cesantias:            string;
    companyName:          string;
    email:                string;
    healthyInsuranceName: string;
    id:                   number;
    identifier:           number;
    isActive:             number;
    lastName:             string;
    name:                 string;
    pension:              string;
    positionName:         string;
    privileges:           number;
    retirementDate:       string;
    salary:               number;
    username:             string;
}