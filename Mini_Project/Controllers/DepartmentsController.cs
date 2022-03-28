using Microsoft.AspNetCore.Http;
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
    public class DepartmentsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DepartmentsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("get-all-departments")]
        public IActionResult GetAllDepartments()
        {
            try
            {
                var _result = _context.Departments.OrderBy(n => n.NameDepartment).ToList();
                return Ok(_result);
            }
            catch (Exception)
            {
                return BadRequest("Sorry, we could not load the departments");
            }
        }

        [HttpGet("get-department-by-id/{id}")]
        public IActionResult GetDepartmentById(int id)
        {
            var department = _context.Departments.FirstOrDefault(n => n.Id == id);
            return Ok(department);
        }

        [HttpPost("add-department")]
        public IActionResult AddDepartment([FromBody] DepartmentVM department)
        {

            try
            {
                var _department = new Department()
                {
                    NameDepartment = department.NameDepartment,
                    Deleted = department.Deleted
                };
                _context.Departments.Add(_department);
                _context.SaveChanges();
                return Created(nameof(AddDepartment), _department);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("update-department-by-id/{id}")]
        public IActionResult UpdateDepartmentById(int id, [FromBody] DepartmentVM department)
        {
            var _department = _context.Departments.FirstOrDefault(n => n.Id == id);
            if (_department != null)
            {
                _department.NameDepartment = department.NameDepartment;
                _department.Deleted = department.Deleted;

                _context.SaveChanges();
            }

            return Ok(_department);
        }

        [HttpDelete("delete-department-by-id/{id}")]
        public IActionResult DeleteDepartmentById(int id)
        {
            var _employees = _context.Employees.FirstOrDefault(n => n.DepartmentId == id);
            if (_employees == null)
            {
                var _department = _context.Departments.FirstOrDefault(n => n.Id == id);
                if (_department != null)
                {
                    _context.Departments.Remove(_department);
                    _context.SaveChanges();
                    return Ok();
                }
                return NotFound();
            }

            return Content("Sorry, we could not delete the departments");
        }
    }
}
