// The base employee class

// Create a hash method for string objects (to be used for password)
/*{
String.prototype.hashCode = function() {
    var hash = 0, i, chr;
    if (this.length === 0) return hash;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
  };
}*/ // This was removed because hashing would be done on the api server, localStorage is just used to simulate a db.

export class Employee{
    constructor(id, fname, lname, password, department, pay, status, startDate=new Date().toDateString(), admin=false, owner=false){
        this.id = id;
        this.firstName = fname;
        this.lastName = lname;
        this.userName = `${fname}${lname}@work.co`;
        this.password = password;
        this.department = department;
        this.pay = pay;
        this.status = status;
        this.endDate = null;
        this.startDate = startDate;
        this.admin = admin;
        this.owner = owner;
    }
}