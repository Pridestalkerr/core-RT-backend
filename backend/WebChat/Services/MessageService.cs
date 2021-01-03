using WebChat.Models;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace WebChat.Services
{
	public class MessageService
	{
		private readonly IMongoCollection <Message> _messages;

		public MessageService(IDBSettings settings)
		{
			var client = new MongoClient(settings.Uri);
			var database = client.GetDatabase(settings.DBName);

			_messages = database.GetCollection<Message>(settings.Messages);
		}

		public async Task <List <Message>> Get()
		{
			return await _messages.Find(message => true).ToListAsync();
		}

		public async Task <Message> Get(string id)
		{
			return await _messages.Find<Message>(message =>
				message.Id == id
			).SingleAsync();
		}

		public async Task <List <Message>> Get(ushort count)
		{
			return await _messages.Find(message => true).Limit(count).ToListAsync();
		}

		public async Task Create(Message msg)
		{
			await _messages.InsertOneAsync(msg);
		}
	}
}