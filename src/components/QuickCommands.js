import React from "react";
import './QuickCommands.css';

class myForm extends React.Component
{
  // constructor(props)
  // {
  //   super(props);
  //   console.log(this.props);
  // }

  render()
  {
    return (

      <div className="quick-wrapper">
            <button onClick={this.props.buttonOneClick} type="submit">~Introduction~</button>
            <button onClick={this.props.buttonTwoClick} type="submit">~They doubt you're actually a computer~</button>
            <button onClick={this.props.buttonThreeClick} type="submit">~Apology for typo or error~</button>
            <button onClick={this.props.buttonFourClick} type="submit">~It was nice meeting you!~</button>
            <button onClick={this.props.buttonFiveClick} type="submit">~Learn Math~</button>
            <br/>
            <br/>
            <button className="toggle" onClick={ this.props.toggleQuickCommandsListVisibility }>Toggle Quick Inputs </button>
            </div>

    )
  }
}

export default myForm;
