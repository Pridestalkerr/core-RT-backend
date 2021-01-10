using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

using WebChat.Hubs.Clients;
using WebChat.Models;
using WebChat.Services;
using System;



namespace WebChat.Hubs
{
	public class ChatHub : Hub<IChatClient>
	{
		private readonly MessageService _messageService;

		public ChatHub(MessageService messageService)
		{
			_messageService = messageService;
		}

		public async Task SendMessage(Message msg)
		{
			await _messageService.Create(msg);
			await Clients.All.ReceiveMessage(msg);
		}
	}
}