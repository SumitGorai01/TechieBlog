import MDEditor from '@uiw/react-md-editor';
import { useSelector } from 'react-redux';

export default function MarkdownDisplay({ content }) {
    const darkMode = useSelector((state) => state.theme.darkMode)

    return (
        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none mb-8">
            {
                !darkMode ?

                    (<MDEditor.Markdown source={content} style={{
                        color: 'rgb(21, 21, 21)',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        width: '100%',
                        backgroundColor: 'rgb(249 250 251)',
                        borderRadius: '0.5rem',
                        padding: '2.5rem',
                        whiteSpace: 'pre-wrap',
                    }} />) : (
                        <MDEditor.Markdown source={content} style={{
                            color: 'rgb(209, 213, 219)', // text-gray-300
                            marginLeft: 'auto', // mx-auto
                            marginRight: 'auto', // mx-auto
                            width: '100%', // w-full
                            backgroundColor: '#2d3748', // dark:bg-gray-800, bg-gray-100
                            borderRadius: '0.75rem', // rounded-xl
                            padding: '2.5rem', // p-10
                            whiteSpace: 'pre-wrap', // ensure proper wrapping
                        }} />
                    )}
        </div>
    );
}