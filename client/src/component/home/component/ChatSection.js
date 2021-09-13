import React from "react";
// My message ----------------

const Mymessage = (props) => {
    return (
        <div className="myMessageContainer">
            <p className="message">{props.message}</p>
            <div className=" timeStamp">
                <p>{props.time}</p>
                <p>{props.status}</p>
            </div>
        </div>
    );
};
// message of friend ----------------
const Friendmessage = (props) => {
    return (
        <div className="friendMessageContainer">
            <p className="message">{props.message}</p>
            <p className=" timeStamp">{props.time}</p>
        </div>
    );
};

// scroll to bottom-------------------------------------

const ChatSection = () => {
    return (
        <div className="chatContainer">
            <div className="chatViewer">
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                    status="seen"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                    status="Received"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                    status="Sent"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfddddddddddddddddddddddddddddddkjkjkj  jkdjfkdjfkd fjdkkkkkkkkkdkdjfkjd kfjd fkjdkf dkfjdkfjd kfjdkfjdkjf dkfjdkfjkdjfkd fjdf dkjfkdjfkdjfkd djf kd kd fkjdkf kdjfkdjfdjfkdjhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Friendmessage
                    message="hi fdghs hsdffhk khdfkdkfgkdgfg dfdgabhishekdg "
                    time="13:40"
                />
            </div>
            <div className="bottomMessageTyper">
                <input
                    className="messageField"
                    type="text"
                    name="chat"
                    placeholder="Write message"
                />
                <button type="button" className="btn btn-primary">
                    <i class="fab fa-telegram-plane"></i>
                </button>
            </div>
        </div>
    );
};

export default ChatSection;
