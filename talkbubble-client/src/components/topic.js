import styled from 'styled-components';

const TopicElem = styled.div`
  color: var(--talkbubble-yellow);
  margin-top: 15px;
  position: relative;
  z-index: 1;
  @media(max-width: 768px) {
    padding: 0;
  }
`

const TopicHeader = styled.h5`
  padding: 0 15px;
  font-weight: bold;
  font-size: 12px;
  line-height: 0.3;
  display: flex;
  justify-content: space-between;
  @media(max-width: 768px) {
    padding: 0;
  }
`

const TopicContent = styled.div`
  border-radius: 0;
  padding: 25px;
  position: relative;
  box-shadow: var(--talkbubble-shadow) inset;
  height: 15vh;
  margin: 15px;
  border: 0;
  background-color: var(--talkbubble-yellow);
  color: var(--talkbubble-blue);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow-y: scroll;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */

  @media(max-width: 768px) {    
    border-radius: 0;
    padding: 25px;
    position: relative;
    box-shadow: var(--talkbubble-shadow) inset;
    height: 20vh;
    border: 0;
    background-color: var(--talkbubble-yellow);
    color: var(--talkbubble-blue);
    margin: 15px 0;
  }
`

const TopicText = styled.div`
  position: relative;
  text-align: center;
  transition: all 0.4s linear;
  left: 0;
  &.transitioning {
    opacity: 0;
    left: -15px;
  }
`
export function Topic(props) {
    return(
      <TopicElem>
        <TopicHeader>
          <span>Random Topic:</span>
          <span>Taken from <a target="_blank" href="https://www.reddit.com/r/Showerthoughts/">r/showerthoughts</a></span>
        </TopicHeader>
        <TopicContent className="no-scroll">
          <TopicText className={(props.transitioningTopic ? 'transitioning' : '')}> {props.topic}</TopicText>
        </TopicContent>
      </TopicElem>
    )
  }
  