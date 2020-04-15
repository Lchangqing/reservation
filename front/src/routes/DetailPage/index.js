/* eslint-disable jsx-a11y/no-redundant-roles */
/* eslint-disable jsx-a11y/href-no-hash */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React from 'react';
import { connect } from 'dva';
import { getCommandBydid, commitCommand } from '../../services/restaurant';
import { searchRePageGetMenus } from '../../models/actionType';
import Command from './Command';
import EditModal from './EditModal';
import cookie from 'react-cookies';
import { Icon } from 'antd';
import './style.css';
function mapStateToProps(state) {
    return { searchRePage: state.searchRePage };
}
class DetailPage extends React.Component {
    constructor(props) {
        super(props);
        const { one_command, two_command } = this.props.location.state;
        this.state = {
            menu: this.props.location.state,
            commands: [],
            show: false,
            one_command,
            two_command
        }
        this.commit = this.commit.bind(this);
    }
    async componentDidMount() {
        const { id } = this.state.menu;
        this.node.scrollIntoView();
        const commands = await getCommandBydid({ id });
        this.setState({ commands })
    }

    componentDidUpdate() {
        const user = cookie.load('user');
        const { showEdit } = this.state;
        if (user && user.rid && user.rid === this.props.location.state.rid && !showEdit) {
            this.setState({ showEdit: true });
        }
    }

    commit = async () => {
        const user = cookie.load('user');
        if (!user) {
            alert('请先登录！');
            return;
        }
        let value = this.inputVal.value.replace(/\ +|[ ]|[\r\n]/g, "");
        // value = value.replace(/[ ]/g, "");    //去掉空格
        // value = value.replace(/[\r\n]/g, "");
        if (!value) {
            alert('发布的评论不能为空！')
            return;
        }
        let date = new Date();
        date = date.toLocaleString();
        const { rid, id: did } = this.state.menu;
        const { name, id: uid } = user;
        let { commands } = this.state;
        await commitCommand({ date, did, rid, name, uid, command: value }).then(async rsp => {
            commands.push(rsp);
            this.setState({ commands });
        })
    }
    handleCancel = () => {
        this.setState({ show: false });
    }
    updateMenu = async (val) => {
        const { one_command, two_command } = val;
        await this.props.dispatch({
            type: searchRePageGetMenus,
            payload: { id: this.state.menu.rid }
        })
        this.setState({ one_command, two_command });
    }
    render() {
        const { img, name } = this.state.menu;
        const { commands, show, one_command, two_command, showEdit } = this.state;
        return (
            <div className="site-wrap" ref={node => this.node = node}>
                <section className="py-lg">
                    <div className="container mt-5">
                        <EditModal handleCancel={this.handleCancel} updateMenu={this.updateMenu} show={show} menu={this.state.menu} />
                        <div className="row blog-entries element-animate">

                            <div className="col-md-12 col-lg-12 main-content">

                                <div className="post-content-body mt-3">
                                    <h1>
                                        {name}
                                        {
                                            showEdit ?
                                                <a style={{ position: 'absolute', top: '1em' }} onClick={() => this.setState({ show: true })}>
                                                    <Icon type="highlight" />
                                                </a>
                                                : null
                                        }
                                    </h1>
                                    {one_command ? one_command : <p className="mt-5">扬州是淮扬菜的发源地和中心，“淮左名都，竹西佳处”，以扬州为起点的淮扬菜，与鲁菜，川菜和粤菜并称为中国四大菜系。扬州地处江苏中部，为历史文化名城，自唐宋以来，扬州一直商贾云集，是备受文人喜好、格调高雅的慢生活城市。朱自清先生客居扬州时写过《说扬州》，称“扬州是讲究吃的好地方”。富春茶社，冶春茶社以及“共和春”，都是闻名遐迩的老字号。“菜根香”、“九炉分座”等餐饮店或已易帜，但也依稀尚存旧时的口味。淮扬美食的精髓在于刀工而最能体现刀工的一道美食莫过于文思豆腐
                                    扬州是淮扬菜的发源地和中心，“淮左名都，竹西佳处”，以扬州为起点的淮扬菜，与鲁菜，川菜和粤菜并称为中国四大菜系。扬州地处江苏中部，为历史文化名城，自唐宋以来，扬州一直商贾云集，是备受文人喜好、格调高雅的慢生活城市。朱自清先生客居扬州时写过《说扬州》，称“扬州是讲究吃的好地方”。富春茶社，冶春茶社以及“共和春”，都是闻名遐迩的老字号。“菜根香”、“九炉分座”等餐饮店或已易帜，但也依稀尚存旧时的口味。淮扬美食的精髓在于刀工而最能体现刀工的一道美食莫过于文思豆腐</p>}
                                    <div className="row mb-5 mt-5">
                                        <div className="col-10 offset-1 mb-4" style={{ maxHeight: 500, overflow: 'hidden' }}>
                                            <img src={img} alt="Image placeholder" className="img-fluid rounded" />
                                        </div>
                                    </div>
                                    {two_command ? two_command : <p>Quibusdam autem, quas molestias recusandae aperiam molestiae modi qui ipsam vel. Placeat tenetur veritatis tempore quos impedit dicta, error autem, quae sint inventore ipsa quidem. Quo voluptate quisquam reiciendis, minus, animi minima eum officia doloremque repellat eos, odio doloribus cum.
                                        Temporibus quo dolore veritatis doloribus delectus dolores perspiciatis recusandae ducimus, nisi quod, incidunt ut quaerat, magnam cupiditate. Aut, laboriosam magnam, nobis dolore fugiat impedit necessitatibus nisi cupiditate, quas repellat itaque molestias sit libero voluptas eveniet omnis illo ullam dolorem minima.
                                        Porro amet accusantium libero fugit totam, deserunt ipsa, dolorem, vero expedita illo similique saepe nisi deleniti. Cumque, laboriosam, porro! Facilis voluptatem sequi nulla quidem, provident eius quos pariatur maxime sapiente illo nostrum quibusdam aliquid fugiat! Earum quod fuga id officia.
                                        Illo magnam at dolore ad enim fugiat ut maxime facilis autem, nulla cumque quis commodi eos nisi unde soluta, ipsa eius aspernatur sint atque! Nihil, eveniet illo ea, mollitia fuga accusamus dolor dolorem perspiciatis rerum hic, consectetur error rem aspernatur!

                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Temporibus magni explicabo id molestiae, minima quas assumenda consectetur, nobis neque rem, incidunt quam tempore perferendis provident obcaecati sapiente, animi vel expedita omnis quae ipsa! Obcaecati eligendi sed odio labore vero reiciendis facere accusamus molestias eaque impedit, consequuntur quae fuga vitae fugit?</p>}
                                </div>

                                <div className="pt-5 col-10 offset-1">
                                    <h3 className="mb-5">{commands.length}条评论</h3>
                                    {commands.length ? <Command commands={commands} /> : null}

                                    <div className="comment-form-wrap">
                                        <h3 className="mb-5">留下您的足迹</h3>
                                        <div action="#" className="p-5 bg-light">
                                            <div className="form-group">
                                                <label for="message">评论</label>
                                                <textarea name="" id="message" cols="30" rows="10" className="form-control" ref={inputVal => this.inputVal = inputVal}></textarea>
                                            </div>
                                            <div className="form-group" style={{ textAlign: 'right' }}>
                                                <input onClick={this.commit} type="button" value="发表" className="btn btn-primary" />
                                            </div>

                                        </div>
                                    </div>
                                </div>

                            </div>

                        </div>
                    </div>
                </section>


                <div className="site-footer">
                    <div className="container">
                        <div className="row">
                            <div className="col-12 text-center">
                                <p>
                                    Copyright &copy; <script>document.write(new Date().getFullYear());</script> All rights reserved | This template is made with <i className="icon-heart text-danger" aria-hidden="true"></i> by <a href="https://colorlib.com" target="_blank" >Colorlib</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}
export default connect(mapStateToProps)(DetailPage);