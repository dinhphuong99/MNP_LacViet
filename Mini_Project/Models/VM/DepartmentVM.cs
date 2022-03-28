using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Mini_Project.Models.VM
{
    public class DepartmentVM
    {
        [Required(ErrorMessage = "Tên phòng ban không được để trống")]
        [MaxLength(200, ErrorMessage = "Tên phòng ban không quá 200 từ")]
        public string NameDepartment { get; set; }

        public bool Deleted { get; set; }
    }
}
