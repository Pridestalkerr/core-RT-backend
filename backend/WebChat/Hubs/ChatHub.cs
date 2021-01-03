using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

using WebChat.Hubs.Clients;
using WebChat.Models;
using System;



namespace WebChat.Hubs
{
	public class ChatHub : Hub<IChatClient>
	{
		public async Task SendMessage(Message msg)
		{
			await Clients.All.ReceiveMessage(msg);
		}
	}
}