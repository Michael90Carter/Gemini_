using System.ComponentModel.DataAnnotations;

namespace Food_Cot.Services.ProductAPI.Models
{
    public class product
    {
        [Key]
        public int ProductId { get; set; }

        [Required]
        public string Name { get; set; }

        [Range(1,1000)]
        public double Price { get; set; }

        public string Description { get; set; }

        public string CateroryName { get; set; }

        public string ImageUrl { get; set; }

    }
}
