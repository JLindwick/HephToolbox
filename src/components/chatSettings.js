import React,
{
  Component
}
from "react";
import './chatSettings.css';

class chatSettings extends Component
{
  // constructor(props)
  // {
  //   super(props);
  //   console.log(this.props);
  //   console.log("You created a chat settings component");
  // }
  render()
  {
    return (

      <div className="chatSettings">
        <table>
          <tbody>
            <tr>
              <td>Robot Voice Selection:</td>
              <td>
                <select id="pet-select" onChange={this.props.handleVoiceChange}>
                  <option value="">--Please choose an option--</option>
                  <option value="BB8">BB8 Voice</option>
                  <option value="Salli">Salli</option>
                  <option value="Kimberly">Kimberly</option>
                  <option value="Kendra">Kendra</option>
                  <option value="Ivy">Ivy</option>
                  <option value="Matthew">Matthew</option>
                  <option value="Justin">Justin</option>
                  <option value="Joey">Joey</option>
                  <option value="Cristiano">Cristiano</option>
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    )
  }
}

export default chatSettings;
