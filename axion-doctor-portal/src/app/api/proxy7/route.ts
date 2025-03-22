import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';
import { WebSocket } from 'ws';

// eslint-disable-next-line
export default function handler(req: IncomingMessage, res: any) {
	if (!res.socket || !res.socket.server) {
		res.status(500).json({ error: 'Server error' });
		return;
	}

	const wss = new WebSocketServer({ server: res.socket.server });

	wss.on(
		'connection',
		(clientSocket: WebSocket, request: IncomingMessage) => {
			const url = new URL(
				request.url ?? '',
				`http://${request.headers.host}`
			);
			const token = url.searchParams.get('token');

			const apiUrl =
				'wss://axiontestgateway.azure-api.net/patients-search';
			const serverSocket = new WebSocket(`${apiUrl}?token=${token}`);

			serverSocket.on('open', () => {
				console.log('Connected to WebSocket server');
			});

			serverSocket.on('message', (data: WebSocket.Data) => {
				clientSocket.send(data);
			});

			serverSocket.on('close', () => {
				console.log('Disconnected from WebSocket server');
				clientSocket.close();
			});

			serverSocket.on('error', (error: Error) => {
				console.error('WebSocket server error:', error);
				clientSocket.close();
			});

			clientSocket.on('message', (data: WebSocket.Data) => {
				serverSocket.send(data);
			});

			clientSocket.on('close', () => {
				console.log('Client WebSocket closed');
				serverSocket.close();
			});

			clientSocket.on('error', (error: Error) => {
				console.error('Client WebSocket error:', error);
				serverSocket.close();
			});
		}
	);

	res.status(200).end();
}
