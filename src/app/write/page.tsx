export default function Write() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Write a Post</h1>
            <textarea
                className="w-full p-2 border rounded-md text-gray-700"
                rows={10}
                placeholder="Start writing..."
            />
        </div>
    );
}