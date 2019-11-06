import React from "react";
import './QuickCommandsList.css';
class myFormList extends React.Component
{

  // constructor(props)
  // {
  //   super(props);
  //   console.log(props);
  // }


  generatePreviewText()
  {
    return (
      <p>{this.props.previewText}</p>
    )
  }
  render()
  {
    return (
      <div className="quick-wrapper-list">
      {this.generatePreviewText()}
        <form>
          <table>
          <tbody>
          <tr>
          <td>First Name</td>
          <td><input type="text" name="FirstName"/></td>
          </tr>
          <tr>
          <td> Last Name:</td>
          <td><input type="text" name="LastName" /></td>
          </tr>
          <tr>
          <td>Favorite:</td>
          <td><input type="text" name="Favorite" /></td>
          </tr>
          <tr>
          <td>Comment: </td>
          <td> <input type="text" name="Comment" /></td>
          </tr>
          </tbody>
          </table>
        </form>
      </div>
    )
  }
}

export default myFormList;
