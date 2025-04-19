import { theme } from "antd";
import { Link } from "react-router-dom";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import { useTranslation } from "react-i18next";

const Cooperation: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <MainLayout>
            <MainHeading title={`${t('titles.cooperation')}`} subtitle="Подзаголоок"/>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <div className="cooperation-main">
                    <div className="cooperation-main-container">
                        <div className="cooperation-main-container-item">
                            <Link to='/countries' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                {t('navigation.countries')}
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/international-organizations' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                    {t('navigation.internationalOrganizations')}
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/international-non-governmental-organizations' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                {t('navigation.internationalNonGovernmentalOrganizations')}
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/international-documents' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                {t('navigation.internationalDocuments')}
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/experts' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                {t('navigation.experts')}
                                </p>
                            </Link>
                        </div>
                        <div className="cooperation-main-container-item">
                            <Link to='/translators' className="cooperation-main-container-item-link">
                                <p className="cooperation-main-container-item-link-text">
                                {t('navigation.translators')}
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