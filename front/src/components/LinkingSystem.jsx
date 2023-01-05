const LikingSystem = (props) => {
    return (
        <>
            <div className="like-button">
                <div className="likes">
                    <i className="icon-like" onClick=""></i>
                    <span>{props.likes}</span>
                </div>
            </div>
            <div className="dislike-button">
                <div className="dislikes">
                    <i className="icon-dislike" onClick=""></i>
                    <span>{props.dislikes}</span>
                </div>
            </div>
        </>
    );
};

export default LikingSystem;
