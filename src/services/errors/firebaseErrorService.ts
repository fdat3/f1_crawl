import { BaseError } from './base'
class FirebaseException extends BaseError {
    constructor(type: any, message: string, code?: number) {
        super({
            code: code || 403,
            type,
            message
        })
    }
}
export class FirebaseErrorService {
    cannotCreateToken(error: any) {
        return new FirebaseException('create_token', error.message)
    }
    cannotDecodeToken(error: any) {
        return new FirebaseException('decode_token', error.message)
    }
    cannotSendMessageToDevice(error: any) {
        return new FirebaseException('send_message_device', error.message)
    }
    cannotSendMessageToDeviceGroup(error: any) {
        return new FirebaseException('send_message_device_group', error.message)
    }
    cannotSendMessageToTopic(error: any) {
        return new FirebaseException('send_message_topic', error.message)
    }
    cannotSendMessageToCondition(error: any) {
        return new FirebaseException('send_message_condition', error.message)
    }
    cannotSubscribeToTopic(error: any) {
        return new FirebaseException('subscribe_topic', error.message)
    }
    cannotUnsubscribeFromTopic(error: any) {
        return new FirebaseException('unsubscribe_topic', error.message)
    }
}
