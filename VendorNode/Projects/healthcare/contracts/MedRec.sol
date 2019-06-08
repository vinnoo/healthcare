pragma solidity >=0.4.24;
pragma experimental ABIEncoderV2;

contract MedRec {

    struct Date {
        uint year;
        uint month;
        uint day;
    }
    
    struct Patient{
        string Name;
        Date DOB;
        Date DOA;
        uint Age;
        string problem;
        string DoctorAssigned;
    }
    
    mapping(uint => Patient) patients;
    
    function registration(uint patientID, string memory _name, uint _year, uint _month, uint _day, uint curr_year, uint curr_month, uint curr_day, string memory _problem, string memory _doctor) public  {
        patients[patientID].Name = _name;
        patients[patientID].DOB.year = _year;
        patients[patientID].DOB.month = _month;
        patients[patientID].DOB.day = _day;
        patients[patientID].DOA.year = curr_year;
        patients[patientID].DOA.month = curr_month;
        patients[patientID].DOA.day = curr_day;
        patients[patientID].Age = patients[patientID].DOA.year - patients[patientID].DOB.year;
        patients[patientID].problem = _problem;
        patients[patientID].DoctorAssigned = _doctor;
   }
    
    function vewPatient(uint _ID) view public returns(string memory){
        return patients[_ID].Name;
    }
}