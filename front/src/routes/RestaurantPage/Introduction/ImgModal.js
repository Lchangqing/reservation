import { Modal, message, Form, Button, Row, Col, Icon, Upload } from 'antd';
import { updateRe } from '../../../services/restaurant';
import { getCookie } from '../../../utils/tools';
import React from 'react';
import './index.css';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
class ImgModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            previewImage: '',
            fileList: [],
            headers: {
                'x-csrf-token': getCookie("csrfToken"),
            },
            img: ''
        };
    }


    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
            if (info.file.response.code === 0) {
                const { id } = this.props.ad;
                const { url } = info.file.response;
                updateRe({ rid: id, datas: [{ name: 'img', val: url }] }).then(rsp => {
                    this.props.updateUrl({ img: url });
                    message.success('图片更改成功！');
                })
            }
        }
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl, headers } = this.state;
        return (
            <Modal
                visible={this.props.show}
                footer={null}
                title="预约吧"
                width={400}
                onCancel={this.props.handleCancel}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="/api/upload"
                    beforeUpload={beforeUpload}
                    onChange={this.handleChange}
                    headers={headers}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
            </Modal>
        );
    }
}
export default Form.create({ name: ' ImgModal' })(ImgModal);