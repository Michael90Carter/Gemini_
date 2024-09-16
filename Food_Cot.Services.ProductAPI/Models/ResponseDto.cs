namespace Food_Cot.Services.ProductAPI.Models
{
    public class ResponseDto
    {
        public bool IsSuccess { get; set; }
        public object Result { get; set; }

        public string DisplayMessage { get; set; } = "";

        public List<string> ErrorMessages { get; set; }
    }
}
