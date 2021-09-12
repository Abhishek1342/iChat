import React from "react";
// My message ----------------

const Mymessage = (props) => {
    return (
        <div className="myMessageContainer">
            <p>{props.message}</p>
            <div>
                <p>{props.time}</p>
                <i class="fas fa-check-double"></i>
            </div>
        </div>
    );
};
// message of friend ----------------
const Friendmessage = (props) => {
    return (
        <div className="friendMessageContainer">
            <p>{props.message}</p>
            <p>{props.time}</p>
        </div>
    );
};

const ChatSection = () => {
    return (
        <div className="chatContainer">
            <div className="chatViewer">
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
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
                <Friendmessage
                    message="hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
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
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
                    time="13:40"
                />
                <Mymessage
                    message="hi hi fdghs hsdfghsdg dshfgkdhfg dfhgkdhfgkds fghsdgfhlds fglhfddfhk khdfkdkfgkdgfg dfdgfdg "
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
                    message="hi fdghs hsdffhk khdfkdkfgkdgfg dfdgfdg "
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
