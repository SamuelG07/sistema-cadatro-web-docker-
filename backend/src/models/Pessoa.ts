import mongoose, { Schema, Document } from 'mongoose';

export interface IPessoa extends Document {
  nome: string;
  email?: string;
  idade?: number;
  createdAt: Date;
}

const PessoaSchema = new Schema<IPessoa>({
  nome: { type: String, required: true, trim: true },
  email: { type: String, trim: true, lowercase: true },
  idade: { type: Number, min: 0, max: 150 }
}, {
  timestamps: true
});

export const Pessoa = mongoose.model<IPessoa>('Pessoa', PessoaSchema);
