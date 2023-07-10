export interface loginResponse {
    isAdmin:     boolean;
    isActive:    boolean;
    _id:         string;
    firstName:   string;
    lastName:    string;
    email:       string;
    dob:         Date;
    gender:      string;
    photoId:     string;
    createdDate: Date;
    __v:         number;
    city:        string;
    country:     string;
    token:       string;
}
