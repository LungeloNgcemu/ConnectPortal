import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Card, Select, Alert } from "antd";
import PhoneNumber from '../../components/phone_number';
import agent from '../../cores/api/agent';
import Otp from '../../components/otp';
import { useNavigate } from "react-router";
import StorageService from '../../cores/services/storage_service';
import NavigationService from '../../cores/services/navigation_service';
import AuthService from '../../cores/services/auth_service';

const LoginView = () => {

    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [phone, setPhone] = useState('');
    const [connects, setConnects] = useState([]);
    const [passwordVerification, setPasswordVerification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isOtp, setIsOtp] = useState(false);
    const [otp, setOtp] = useState('');



    const onFinish = async (values) => {
        await login();
    }

    const onFinishOtp = async (values) => {
        setIsLoading(true);
        await verifyOtp();
        setIsLoading(false);
    }

    const login = async () => {
        setIsLoading(true);
        await checkPassword();


    }

    useEffect(() => {
        AuthService.isLoggedIn(navigate);
    }, []);

    useEffect(() => {
        if (passwordVerification === true) {
            setIsLoading(false);
            setIsOtp(true);
        }
    }, [passwordVerification]);


    const getConnects = async () => {
        await agent.connects.getConnects().then((response) => {
            const data = response.data;

            const connectOptions = data.map((connect) => ({
                value: connect.UniqueId,
                label: connect.ChurchName,
            }));
            setConnects(connectOptions);
        });
    }
    const checkPassword = async () => {

        const uniqueId = form.getFieldValue("select");
        const password = form.getFieldValue("password");
        try {
            await agent.auth.passwordCheck({ password: password, uniqueId: uniqueId }).then((response) => {
                if (response.status === 200) {
                    setPasswordVerification(true);
                }
            });
        } catch (error) {
            console.log('error', error.response.status);
            setPasswordVerification(false);
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (passwordVerification === true) {
            sendOtp();
        }
    }, [passwordVerification]);

    const sendOtp = async () => {
        const phoneNumber = form.getFieldValue("phone");
        await agent.auth.sendOtp({ phoneNumber: phoneNumber }).then((response) => {
            if (response.status === 200) {
                setIsLoading(false);
                setIsOtp(true);
            }
        });
    }

    const verifyOtp = async () => {

        const uniqueId = form.getFieldValue("select");
        const otp = form.getFieldValue("otp");
        const phoneNumber = form.getFieldValue("phone");

        const data = {

            "phoneNumber": phoneNumber,
            "secret": otp,
            "userName": "",
            "gender": "",
            "selectedChurch": "",
            "role": "",
            "uniqueChurchId": uniqueId

        }

        await agent.auth.verifyOtp(data).then((response) => {
            if (response.status === 200) {
                StorageService.setToken(response.data.token);
                StorageService.setUser(response.data.user);
                NavigationService.navigate(navigate, "/main");
                setIsLoading(false);
            }
        });
    }

    const setOtpValue = (otp) => {
        form.setFieldValue("otp", otp);
        setOtp(otp);
        console.log(form.getFieldsValue());
    }

    const handleChange = value => {

    };

    const setPhoneNumber = (phone) => {
        form.setFieldValue("phone", phone);
    }

    useEffect(() => {
        getConnects();
    }, []);

    return (
        !isOtp ? (<Card
            title={<div style={{ fontSize: "2rem", fontWeight: "bold" }}>Connect</div>}

        >
            {passwordVerification === false && (
                <Alert
                    message="Password verification failed"
                    type="error"
                    showIcon
                    style={{ marginBottom: 16 }}
                    closable
                    onClose={() => setPasswordVerification(null)}
                />
            )}
            <Form form={form} layout="vertical" onFinish={onFinish} style={{
                width: "50vw",
                height: "50vh",
                display: "flex",
                justifyContent: "space-between",
                flexDirection: "column",
                textAlign: "start"
            }}>
                <div>
                    <Form.Item label="Select Connect" name="select" rules={[
                        { required: true, message: "Please select a connect!" },
                    ]}>
                        <Select
                            style={{ width: '100%', textAlign: "start" }}
                            placeholder="..."
                            onChange={handleChange}
                            options={connects}
                        />
                    </Form.Item>
                    <Form.Item label="Phone number" name="phone" rules={[
                        { required: true, message: "Please enter your phone number!" },
                        { min: 6, message: "Phone number must be at least 6 characters" },
                    ]}

                        style={{ width: "100%" }}
                    >
                        <PhoneNumber
                            phone={phone}
                            setPhone={setPhoneNumber}
                        />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[
                        { required: true, message: "Please enter your password!" },
                    ]}>
                        <Input.Password />
                    </Form.Item>
                </div>
                <Form.Item style={{ textAlign: "center" }}>
                    <Button loading={isLoading} style={{ backgroundColor: "black", color: "white", fontSize: "1.1rem", fontWeight: "bold" }} type="primary" block htmlType="submit">
                        Connect
                    </Button>
                </Form.Item>
            </Form>
        </Card>) : (<Card title={<div style={{ fontSize: "2rem", fontWeight: "bold" }}>OTP</div>}
        >
            <Form form={form} layout="vertical" onFinish={onFinishOtp} style={{
                width: "50vw",
                height: "20vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
            }}>
                <Form.Item name="otp" rules={[
                    { required: true, message: "Please enter your OTP!" },
                ]}>
                    <Otp otp={otp} setOtp={setOtpValue} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center", width: "50vw" }}>
                    <Button loading={isLoading} style={{ backgroundColor: "black", color: "white", fontSize: "1.1rem", fontWeight: "bold" }} type="primary" block htmlType="submit">
                        Verify
                    </Button>
                </Form.Item>
            </Form>
        </Card>)
    )
}

export default LoginView



