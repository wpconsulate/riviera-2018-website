import React from 'react'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table'
import {
  Card,
  CardText,
  CardTitle,
  CardHeader,
  CardActions
} from 'material-ui/Card'
import {Link} from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import FontAwesome from 'react-fontawesome'
import {Row,Col} from 'react-flexbox-grid'
import FlatButton from 'material-ui/FlatButton'

class EventsList extends React.Component {
  state={
    query:''
  }
  updateQuery=(query)=>{
    this.setState({
      query:query.trim()
    })
  }
  render(){
    const {events}=this.props
    const {query}=this.state
    let showingEvents
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      showingEvents = events.filter((event) => match.test(event['EVENT NAME']))
    } else {
      showingEvents = events
    }
    return(
      <div className='events-list'>
        {(events.length>0 && !this.props.loading)?
          <div>
          {this.props.loading?
            <div>Loading...</div>
            :
            <div>
              <h1>{this.props.event_category}</h1>
              <div className='search-container' style={{display:'flex',justifyContent:'flex-end',width:'90%',marginRight:'200px'}}>
                <input
                  type='text'
                  value={query}
                  onChange={(e)=>this.updateQuery(e.target.value)}
                  style={{
                    background:'#242424',
                    border:'0px',
                    padding:'10px',
                    color:'#fff'
                  }}
                  placeholder='Search'
                />
                <FontAwesome name='search' style={{padding:'10px'}}/>
              </div>
              <Row style={{width:'100%'}} top='md'>
                {showingEvents.map((event)=>(
                  <Col md={4} xs={12} style={{flexBasis:'50%'}}>
                    <Card style={{margin:'20px',background:'#232323',color:'#fff'}}>
                      <CardTitle
                        title={event['EVENT NAME']}
                        subtitle={event['CLUB NAME']}
                        style={{textAlign:'left',color:'#fff'}}
                        titleColor='#fff'
                        subtitleColor='#fff'
                      />
                      <CardText
                        color='#fff'
                        style={{textAlign:'left'}}
                      >
                        {event['DESCRIPTION']}
                      </CardText>
                      <CardActions>
                        <FlatButton disabled
                          label={`Prize:${event['Prize Money']}`}
                          icon={<FontAwesome name='rupee' style={{color:'#fff'}}/>}
                          labelStyle={{color:'#fff'}}
                        />
                        <FlatButton disabled
                          icon={<FontAwesome name='rupee' style={{color:'#fff'}}/>}
                          label={`${event['Reg fees After GST']}/ person`}
                          labelStyle={{color:'#fff'}}
                        />
                        <Link to={`/event/${this.props.event_category}/${event['EVENT NAME']}`}><FlatButton label='View and Share' labelStyle={{color:'#fff'}} fullWidth={true}/></Link>
                      </CardActions>
                    </Card>
                  </Col>
                ))}
              </Row>
            {/*<Table
              selectable={false}
              style={{background:'#2D2D2D',width:'95%',margin:'20px'}}
              >
              <TableBody displayRowCheckbox={false}>
                {/*<TableRow style={{color:'#fff'}}>
                  <TableRowColumn style={{fontWeight:'bold'}}>Event Name</TableRowColumn>
                  <TableRowColumn style={{fontWeight:'bold'}}>Club Name</TableRowColumn>
                  <TableRowColumn style={{fontWeight:'bold'}}>Description</TableRowColumn>
                  <TableRowColumn style={{fontWeight:'bold'}}>More Details</TableRowColumn>
                </TableRow>
                {showingEvents.map((event)=>(
                  <TableRow key={event['EVENT NAME']} selectable={false} style={{color:'#fff'}}>
                    <TableRowColumn>{event['EVENT NAME']}</TableRowColumn>
                    <TableRowColumn>{event['CLUB NAME']}</TableRowColumn>
                    <TableRowColumn>{event['DESCRIPTION']}</TableRowColumn>
                    <TableRowColumn>
                      <Link
                        style={{
                          border:'0px',
                          padding:'10px'
                        }}
                        to={`/event/${this.props.event_category}/${event['EVENT NAME']}`}
                        >View Details</Link></TableRowColumn>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            */}
            </div>
          }
          </div>
          :
          <div>
            {this.props.loading?
              <div>Loading...</div>
              :
              <div>{this.props.event_category?<span>No Events found</span>:<span>Select a Category from above</span>}</div>
            }
          </div>
        }
      </div>
    )
  }
}

export default EventsList
