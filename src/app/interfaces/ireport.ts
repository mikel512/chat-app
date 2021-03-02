/*
    Other_User_Options: Report(types: SPAM, Profanity, Hate, Other)
    JSON: {"REPORT_USER": ["type", "user_reported", "user_reporting", "msg"]}
*/
export interface IReport {
    REPORT_USER: [type: string,
                  user_reported: string, 
                  user_reporting: string, 
                  msg: string,
                  comment: string,
                  urgent: boolean]
}
