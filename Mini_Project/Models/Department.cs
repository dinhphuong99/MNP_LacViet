using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Mini_Project.Models
{
    public class Department
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "Tên phòng ban không được để trống")]
        [MaxLength(200, ErrorMessage = "Tên phòng ban không quá 200 từ")]
        public string NameDepartment { get; set; }

        public bool Deleted { get; set; }
        public List<Employee> Employees { get; set; }
    }
}
