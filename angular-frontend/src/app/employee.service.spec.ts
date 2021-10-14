import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
 
import { EmployeeService } from './employee.service';
import { Employee } from '././employee'

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpTestingController : HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers : [EmployeeService]
    });
    service = TestBed.inject(EmployeeService);
  });

  beforeEach(() => {
    service = TestBed.inject(EmployeeService);
    httpTestingController = TestBed.inject(HttpTestingController);
  })


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it ('test Get Employees List', () => {
    const testEmployees : Employee[] = [
      {id : 1, firstName : "selmon", lastName : "bhai", emailId : "selmon@gmail.com"},
      {id : 2, firstName : "tube", lastName : "light", emailId : "tubelight@gmail.com"},
    ]
    service.getEmployeesList().subscribe((employees)=>{
      expect(employees).toBe(testEmployees, 'should check mocked data');
    });

    const req = httpTestingController.expectOne(service.baseURL);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testEmployees);

	httpTestingController.verify();
    
  });

  it ('test Get Employee By Id', () => {
    const testEmployee : Employee = {id : 1, firstName : "selmon", lastName : "bhai", emailId : "selmon@gmail.com"};
    let id = 1;
    service.getEmployeeById(id).subscribe((employee)=>{
      expect(employee).toBe(testEmployee, 'should check mocked data');
    });

    const req = httpTestingController.expectOne(service.baseURL +  '/' + id);

    expect(req.cancelled).toBeFalsy();
    expect(req.request.responseType).toEqual('json');

    req.flush(testEmployee);
	httpTestingController.verify();
  });

});