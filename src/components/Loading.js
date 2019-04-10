const Loading = (props) => {
    return (
        <div className="ui active inverted dimmer" style={{height: '100vh'}}>
            <div className="ui text loader">{props.text}</div>
        </div>
    );

}
export default Loading;