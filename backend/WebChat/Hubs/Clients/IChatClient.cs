using System.Threading.Tasks;
using WebChat.Models;

namespace WebChat.Hubs.Clients
{
    public interface IChatClient
    {
        Task ReceiveMessage(Message message);
    }
}