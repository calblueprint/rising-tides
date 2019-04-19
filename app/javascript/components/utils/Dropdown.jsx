import React from "react";
import onClickOutside from "react-onclickoutside"

class Dropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listOpen: false,
        headerTitle: this.props.title
    }
  }

  handleClickOutside(e) {
    this.setState({
        listOpen: false
    });
  }

  toggleList() {
    this.setState(prevState => ({
        listOpen: !prevState.listOpen
    }));
  }

  static getDerivedStateFromProps(nextProps) {
    const selected = nextProps.list.filter(function(a) { return a.selected; });
    const count = selected.length;
    if (count === 0) {
      return {headerTitle: nextProps.title}
    }
    else if (nextProps.singleItem) {
        return {headerTitle: selected[0].title}
    }
    else if (count === 1) {
      return {headerTitle: `${count} ${nextProps.titleHelper}`}
    }
    else if (count > 1) {
      return {headerTitle: `${count} ${nextProps.titleHelper}s`}
    }
  }

  render() {
    const {list, toggleItem} = this.props;
    const {listOpen, headerTitle} = this.state;

    return (
        <div className="dib ba b--black-10 w-100 mr2 bg-white pointer disable-selection">
            <div className="pa2" onClick={() => this.toggleList()}>
                <div className="dib tl w-75 light-grey-2 f6">{headerTitle}</div>
                <div className="dib tr w-25">
                {listOpen
                    ? <span className="fa fa-angle-down mr2"></span>
                    : <span className="fa fa-angle-up mr2"></span>
                }
                </div>
            </div>

            <div className="relative">
                
                    {listOpen && <div className="dropdown-scroller absolute top-0 bg-white w-100 ba b--black-10">
                        <ul className="list pl0 ma0">
                        {list.map((item) => (
                            <li
                                className="bt b--black-10 pa2 dim"
                                key={item.id}
                                onClick={() => toggleItem(item.id, item.key)}>
                                    <div className="dib tl w-75 f6">{item.title}</div>
                                    {item.selected &&
                                    <div className="dib tr w-25 f6">
                                        <span className="fa fa-check"></span>
                                    </div>}
                            </li>
                        ))}
                        </ul>
                    </div>}
            </div>
        </div>
    );
  }
}

export default onClickOutside(Dropdown);
