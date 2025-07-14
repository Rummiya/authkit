import type MessageResponse from './message-response';

interface ErrorResponse extends MessageResponse {
	stack?: string;
}
export default ErrorResponse;
