import {
    MessageResponse
} from "../../helpers/messageResponse";

export const authToken = (req, res, next) => {
    if (!req.user) {
        res.status(401).send(MessageResponse.unauthorized());
    } else {
        next();
    }
}
