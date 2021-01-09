export function Topic(props) {
    return(
      <div className="topic">
        <h5 className="topic-header">
          <span>Random Topic:</span>
          <span>Taken from <a target="_blank" href="https://www.reddit.com/r/Showerthoughts/">r/showerthoughts</a></span>
        </h5>
        <div className={"topic-content "}>
          <div className={"topic-text " + (props.transitioningTopic ? 'transitioning' : '')}> {props.topic}</div>
        </div>
      </div>
    )
  }
  