import { FaPlus } from "react-icons/fa";
import { theme } from "antd";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import Button from "../../components/button";
import { Link } from "react-router-dom";

const Cooperation: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    return (
        <MainLayout>
            <MainHeading title="Сотрудничество" subtitle="Подзаголоок"/>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="cooperation-main">
                    <div className="cooperation-main-container">
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Страны
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Международные организации
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Международные неправительственные организации
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Международные документы
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Эксперты
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                Переводчики
                                </p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
};

export default Cooperation;