namespace WebChat.Models
{
    public class DBSettings : IDBSettings
    {
        public string Messages { get; set; }
        public string Users { get; set; }
        public string Uri { get; set; }
        public string DBName { get; set; }
    }

    public interface IDBSettings
    {
        string Messages { get; set; }
        string Users { get; set; }
        string Uri { get; set; }
        string DBName { get; set; }
    }
}
