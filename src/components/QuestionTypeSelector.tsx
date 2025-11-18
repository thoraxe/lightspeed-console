import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  MenuToggle,
  MenuToggleElement,
  Select,
  SelectList,
  SelectOption,
} from '@patternfly/react-core';
import { QuestionIcon } from '@patternfly/react-icons';

import { setQuestionType } from '../redux-actions';
import { QuestionType } from '../types/QuestionType';
import { State } from '../redux-reducers';

type QuestionTypeSelectorProps = {
  isDisabled?: boolean;
};

const QuestionTypeSelector: React.FC<QuestionTypeSelectorProps> = ({ isDisabled = false }) => {
  const dispatch = useDispatch();
  const selectedQuestionType: QuestionType = useSelector((s: State) =>
    s.plugins?.ols?.get('questionType'),
  );

  const [isOpen, setIsOpen] = React.useState(false);

  const questionTypeOptions = [
    {
      value: QuestionType.GeneralQA,
      label: 'General Q&A',
      description: 'General questions about OpenShift and Kubernetes',
    },
    {
      value: QuestionType.Troubleshooting,
      label: 'Troubleshooting',
      description: 'Investigate errors and debug issues',
    },
    {
      value: QuestionType.BestPractices,
      label: 'Best Practices',
      description: 'Get recommendations for security, performance, and operational excellence',
    },
    {
      value: QuestionType.GettingStarted,
      label: 'Getting Started',
      description: 'Learn OpenShift concepts and get step-by-step guidance for beginners',
    },
    {
      value: QuestionType.Configuration,
      label: 'Configuration & Setup',
      description: 'Get help with installation, deployment, and system configuration',
    },
  ];

  const selectedOption = questionTypeOptions.find(
    (option) => option.value === selectedQuestionType,
  );

  const onToggleClick = () => {
    if (!isDisabled) {
      setIsOpen(!isOpen);
    }
  };

  const onSelect = (
    _event: React.MouseEvent<Element, MouseEvent> | undefined,
    value: string | number | undefined,
  ) => {
    if (value && typeof value === 'string') {
      const questionType = value as QuestionType;
      dispatch(setQuestionType(questionType));
      setIsOpen(false);
    }
  };

  const toggle = (toggleRef: React.Ref<MenuToggleElement>) => (
    <MenuToggle
      aria-label="Question type selector"
      className="ols-plugin__question-type-selector"
      icon={<QuestionIcon />}
      id="question-type-toggle"
      isDisabled={isDisabled}
      isExpanded={isOpen}
      onClick={onToggleClick}
      ref={toggleRef}
    >
      {selectedOption?.label || 'Select question type'}
    </MenuToggle>
  );

  return (
    <Select
      aria-label="Select question type"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      onSelect={onSelect}
      selected={selectedQuestionType}
      toggle={toggle}
    >
      <SelectList>
        {questionTypeOptions.map((option) => (
          <SelectOption description={option.description} key={option.value} value={option.value}>
            {option.label}
          </SelectOption>
        ))}
      </SelectList>
    </Select>
  );
};

export default QuestionTypeSelector;
