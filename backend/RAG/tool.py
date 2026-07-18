from pathlib import Path

from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma

retriever = None
vector_db = None
embedding_model = None

BASE_DIR = Path(__file__).resolve().parent
CHROMA_DIR = BASE_DIR / "chroma_db"
KNOWLEDGE_DIR = BASE_DIR / "knowledge"

def load_all_documents(knowledge_dir: Path):
    all_documents=[]
    for pdf in knowledge_dir.rglob("*.pdf"):
        try:
            loader = PyPDFLoader(str(pdf))
            documents = loader.load()
            all_documents.extend(documents)
        except Exception as e:
            print(f"Failed to load {pdf}: {e}")
    if not all_documents:
        raise RuntimeError("No valid PDF documents were loaded.")
    return all_documents

def split_documents(documents: list):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50
    )

    return splitter.split_documents(documents)

def create_embedding_model():

    return HuggingFaceEmbeddings(
        model_name="sentence-transformers/all-MiniLM-L6-v2"
    )

def create_vector_database(chunks, embedding_model):

    return Chroma.from_documents(
        documents=chunks,
        embedding=embedding_model,
        persist_directory=str(CHROMA_DIR)
    )

def load_vector_database(embedding_model):
        return Chroma(
        persist_directory=str(CHROMA_DIR),
        embedding_function=embedding_model
    )

def initialize_rag(knowledge_dir : Path, k: int= 3):

    global retriever
    global vector_db
    global embedding_model

    if retriever is not None:
        return

    embedding_model = create_embedding_model()
    if CHROMA_DIR.exists():
            vector_db = load_vector_database(
                 embedding_model
             )
    else :
        try:
            documents = load_all_documents(knowledge_dir)
            chunks = split_documents(documents)

        except Exception as e:
             raise RuntimeError(
                f"Failed to initialize RAG: {e}"
            )

        vector_db = create_vector_database(
        chunks,
        embedding_model
        )

    retriever = vector_db.as_retriever(
    search_kwargs={"k": k}
    )

    print("RAG initialized successfully.")

def retrieve_context(query):

    if retriever is None:
        raise RuntimeError(
            "RAG has not been initialized."
        )

    docs = retriever.invoke(query)

    return "\n\n".join(
        doc.page_content
        for doc in docs
    )

if __name__ == "__main__":

    initialize_rag(KNOWLEDGE_DIR)

    print(retrieve_context("RSI above 70"))