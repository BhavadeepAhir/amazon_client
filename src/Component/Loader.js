export default function Loader({ loading }) {

    return (
        <>
        {
            loading ? (

            <div
                className="w-100 d-flex flex-column justify-content-center bg-light align-items-center"
                style={{ minHeight: "100vh", position: "sticky", zIndex: "1000", top: "0" }}
            >
                <i class="fa-solid fa-spinner fa-spin fs-1"></i>
                <h6 className="mt-3">Loading...</h6>
            </div>
            ): ""
        }
        </>
    )
}