import { Footer } from "antd/es/layout/layout";

export default function LayoutFooter() {
    return <>
        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©{new Date().getFullYear()} Created by Viet Bui
        </Footer>
    </>;
}