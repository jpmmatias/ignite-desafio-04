import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { useRef } from 'react';
import { FormHandles } from '@unform/core';
import { FoodTypes } from '../Food/index';

export type UpdateFood = Omit<FoodTypes, 'available'>;
interface ModalUpdateFood {
	isOpen: boolean;
	setIsOpen: () => void;
	handleUpdateFood: (food: UpdateFood) => void;
	editingFood: UpdateFood;
}

function ModalEditFood({
	setIsOpen,
	isOpen,
	handleUpdateFood,
	editingFood,
}: ModalUpdateFood) {
	const formRef = useRef<FormHandles>(null);
	const handleSubmit = async (data: UpdateFood) => {
		handleUpdateFood(data);
		setIsOpen();
	};

	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
				<h1>Editar Prato</h1>
				<Input name='image' placeholder='Cole o link aqui' />

				<Input name='name' placeholder='Ex: Moda Italiana' />
				<Input name='price' placeholder='Ex: 19.90' />

				<Input name='description' placeholder='Descrição' />

				<button type='submit' data-testid='edit-food-button'>
					<div className='text'>Editar Prato</div>
					<div className='icon'>
						<FiCheckSquare size={24} />
					</div>
				</button>
			</Form>
		</Modal>
	);
}

export default ModalEditFood;
