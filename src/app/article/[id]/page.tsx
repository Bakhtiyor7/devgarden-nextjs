export default function Article({ params }: { params: { id: string } }) {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Article {params.id}</h1>
            <p className="text-gray-600">This is the article with ID: {params.id}.</p>
        </div>
    );
}