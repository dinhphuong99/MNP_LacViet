using Microsoft.AspNetCore.Mvc;
using Mini_Project.Data;
using Mini_Project.Models;
using Mini_Project.Models.VM;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Mini_Project.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController: ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all-employees")]
        public IActionResult GetAllEmployees()
        {
            try
            {
                var _result = _context.Employees.OrderBy(n => n.LastName).ToList();
                return Ok(_result);
            }
            catch (Exception)
            {
                return BadRequest("Sorry, we could not load the employees");
            }
        }

        [HttpGet("get-all-employees-with-departmentId/{id}")]
        public IActionResult GetAllEmployeesWithDepartmentId(int id)
        {
            try
            {
                List<Employee> listEmployee = _context.Employees.OrderBy(n => n.LastName).ToList();
                var result = listEmployee.Where(e => e.DepartmentId == id);
                return Ok(result);
            }
            catch (Exception)
            {
                return BadRequest("Sorry, we could not load the employees");
            }
        }

        [HttpGet("get-employee-by-id/{id}")]
        public IActionResult GetEmployeesById(int id)
        {
            var employee = _context.Employees.FirstOrDefault(n => n.Id == id);
            return Ok(employee);
        }

        [HttpPost("add-employee-with-departments")]
        public IActionResult AddEmployeeWithDepartment([FromBody] EmployeeVM employee)
        {
            try
            {
                var _depatment = _context.Departments.FirstOrDefault(n => n.Id == employee.DepartmentId);
                var _employee = new Employee()
                {
                    FirstName = employee.FirstName,
                    LastName = employee.LastName,
                    Deleted = employee.Deleted,
                    Position = employee.Position,
                    Title = employee.Title,
                    AvatarPath = employee.AvatarPath,
                    DepartmentId = employee.DepartmentId,
                    NameDepartment = _depatment.NameDepartment
                };
                _context.Employees.Add(_employee);
                _context.SaveChanges();
                return Created(nameof(AddEmployeeWithDepartment), _employee);
                
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-employee-by-id/{id}")]
        public IActionResult UpdateEmployeesById(int id, [FromBody] EmployeeVM employee)
        {
            
            try
            {
                var _employee = _context.Employees.FirstOrDefault(n => n.Id == id);
                var _depatment = _context.Departments.FirstOrDefault(n => n.Id == employee.DepartmentId);
                if (_employee != null)
                {
                    _employee.FirstName = employee.FirstName;
                    _employee.LastName = employee.LastName;
                    _employee.Deleted = employee.Deleted;
                    _employee.Position = employee.Position;
                    _employee.Title = employee.Title;
                    _employee.AvatarPath = employee.AvatarPath;
                    _employee.DepartmentId = employee.DepartmentId;
                    _employee.NameDepartment = _depatment.NameDepartment;
                };
                _context.SaveChanges();
                return Ok();

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("delete-employee-by-id/{id}")]
        public IActionResult DeleteEmployeesById(int id)
        {
            var _book = _context.Employees.FirstOrDefault(n => n.Id == id);
            if (_book != null)
            {
                _context.Employees.Remove(_book);
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
    }
}
