

const boarding_list = [
    {
        title:"Generator Usage",
        description:"Hours of use in the last trip",
        inputType:"numerical",
        id:0
    },
    {
        title:"Anchors - Clean ",
        description:"Wash Sand off of anchors",
        inputType:"checkbox",
        id:1
    },
    {
        title:"Stowed Ropes",
        description:"Ropes are put away",
        inputType:"checkbox",
        id:2
    },
    {
        title:"Ropes Quality",
        description:"Rope Quality",
        inputType:"range",
        id:3
    },
    {
        title:"Generator Usage",
        description:"Anything else the Captian wants to comment on",
        inputType:"text",
        id:4
    }
]
const USER = {
    firstName: "Braden",
    lastName: "Shill",
    "username":"bshill",
    dateJoined: new Date(),
    properties: [],
}

function Jumbotron(){
    return (
        <div className = "jumbotron">
            <h1 className ="display-1">Fikit</h1>
            <p>The Multi-Ownership Property Managment Software You Have Been Waiting For</p>
        </div>
    );
}

function Nav(props){
    return (
        <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="#">{props.user.username}</a>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Pricing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
          </div>
        </nav>
    );
}

function SingleBoardingProcess(props){
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.description}</td>
            <td>{props.inputType}</td>
            <td>
                <div className="btn-group" role="group">
                    <button className="btn btn-outline-warning" type="button">Edit</button>
                    <button className="btn btn-outline-danger" type="button" onClick={props.onDelete}>&times;</button>
                </div>
            </td>
        </tr>
    );
}

class BoardingProcessManager extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            boardingList: props.boardingList
        }
        this.onAddItem = this.onAddItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
    }

    onAddItem(e){
        let newlist = this.state.boardingList;
        newlist.push({
            title:"Generator Usage",
            description:"Anything else the Captian wants to comment on",
            inputType:"text",
            id:5
        })

        this.setState({
            boardingList: newlist
        })
    }

    onDeleteItem(id,e){
        console.log(e);
        console.log(id);
        var array = this.state.boardingList;

        var index = array.indexOf(id)
        console.log(index);
        array.splice(index, 1);

        this.setState({
            boardingList: array
        })
        // let oldList = this.state.boardingList.splice();

    }

    render() {
        return (
            <div>
                <div className="row">
                    <div className="col">
                        <h3> Boarding Process Manager</h3>
                        <h6> Last Updated: 3 sec ago</h6>
                    </div>
                    <div className="col-md-1">
                        <button className="btn btn-success" data-toggle="modal" data-target="#add-modal">Add</button>
                    </div>
                </div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Title</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type of Input</th>
                            <th scope="col">Edit/Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.boardingList.map((item)=>{
                            return <SingleBoardingProcess title={item.title} description={item.description} inputType={item.inputType} key={item.id} onDelete={this.onDeleteItem.bind(this,item)}/>
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

function AddItemModal (props){
    return (
        <div className="modal fade" id="add-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLongTitle">Add Item</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="container-fluid">
                    <form>
                        <div className="form-group">
                            <label>Title</label>
                            <input className="form-control" placeholder="Title"></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input className="form-control" placeholder="Description"></input>
                        </div>
                        <div className="form-group">
                            <label>Type of Input</label>
                            <select className="custom-select mr-sm-2" id="inlineFormCustomSelect" >
                                <option selected value="range">Scale(1-10)</option>
                                <option value="list">List</option>
                                <option value="number">Numerical</option>
                                <option value="Checkbox">Checkbox</option>
                                <option value="text">Text Feild</option>
                            </select>
                        </div>
                    </form>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
    );
}

function Application(props){
    return (
        <div className = "container">
            <Jumbotron />
            <Nav user= {props.user} />
            <BoardingProcessManager boardingList= {props.boardingList}/>

            <AddItemModal boardingList="{props.boardingList}"/>
        </div>
    );
}

ReactDOM.render(<Application boardingList = {boarding_list} user={USER}/>, document.getElementById('root'));
//ReactDOM.render(<Clock />,document.getElementById('root'));
